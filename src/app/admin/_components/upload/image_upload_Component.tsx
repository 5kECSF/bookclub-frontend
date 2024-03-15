import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Spin, UploadFile, UploadProps, message } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import {
  beforeImageUpload,
  beforeUpload,
  getBase64,
  isJpgOrPng,
} from "@/app/admin/_components/upload/image_util";
import Image from "next/image";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

export const UploadComponent = forwardRef(function UploadComp(
  { isLoading, isUpdate }: { isLoading: boolean; isUpdate: boolean },
  ref,
) {
  const [imgList, setImgList] = useState<UploadFile[]>([]);
  const uploadImages = () => {
    const formData = new FormData();
    if (!imgList.length) {
      return message.error("Cover photo is required");
    } else if (!("url" in imgList[0]) && !isJpgOrPng(imgList[0])) {
      return message.error("Book cover can only be JPG/PNG file!");
    }
    imgList.forEach((file) => {
      if (!("url" in file)) {
        formData.append("images", file.originFileObj as Blob);
      }
    });
    console.log("form data is====", formData);
    return ["formData"];
  };
  useImperativeHandle(ref, () => ({
    uploadAndReturnFileNames: uploadImages,
  }));

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setImgList(newFileList);
  };
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const onRemove = (file: UploadFile) => {
    if ("url" in file && file.url) {
      setRemovedImages([...removedImages, file.name]);
    }
  };
  /**
   * states related to Preview
   */
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };
  // !----------  END OF PREVIEW   ---------!
  const uploadButton = (
    <div>
      {isLoading ? "...loading" : "+"}
      <div style={{ marginTop: 8 }}>{isUpdate ? "Update" : "Create"}</div>
    </div>
  );
  return (
    <>
      <Upload
        beforeUpload={beforeImageUpload}
        listType="picture-card"
        fileList={imgList}
        onPreview={handlePreview}
        onChange={onChange}
        maxCount={3}
        onRemove={onRemove}
      >
        {imgList.length < 2 && uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image
          alt={previewTitle}
          width={500}
          height={700}
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </>
  );
});
