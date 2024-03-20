import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Modal, UploadFile, UploadProps, message, Button } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import {
  beforeImageUpload,
  beforeUpload,
  getBase64,
} from "@/app/admin/_components/upload/image_util";
import Image from "next/image";
import { useMutate } from "@/lib/hooks/useMutation";
import { KY, MTD, AppHeaders } from "@/lib/constants";
import { toast } from "react-toastify";

export const MultiFileUpload = forwardRef(function UploadComp(
  {
    isLoading,
    isUpdate,
    fileNo,
    imgOnly,
    oldData = [],
  }: {
    isLoading: boolean;
    imgOnly: boolean;
    oldData: any;
    isUpdate: boolean;
    fileNo: number;
  },
  ref,
) {
  // Previously uploaded Images
  const [oldImgList, setOldImgList] = useState<UploadFile[]>([]);

  const [removedImages, setRemovedImages] = useState<UploadFile[]>([]);

  const doesObjectExist = (name: string, list: { name: string }[]): boolean => {
    return list.some((file: { name: string }) => file.name === name);
  };
  const onRemove = (file: UploadFile) => {
    if (
      file?.url &&
      file.name &&
      !doesObjectExist(file?.name as string, removedImages)
    ) {
      // add it ot the removed images list
      setRemovedImages([...removedImages, file]);
      //remove it from the old images list
      const filteredList = oldImgList.filter(
        (oldImg) => oldImg.name !== file.name,
      );
      setOldImgList(filteredList);
    }
    console.log("rmvd--", removedImages);
  };
  const onReAdd = (file: UploadFile) => {
    if (
      file?.url &&
      file.name &&
      !doesObjectExist(file?.name as string, oldImgList)
    ) {
      // add it ot the Main Images List
      setOldImgList([...oldImgList, file]);
      //remove it from the removed Images List
      const filteredList = removedImages.filter(
        (oldImg) => oldImg.name !== file.name,
      );
      setRemovedImages(filteredList);
    }
    console.log("rmvd--", removedImages);
  };

  const [allowedFilesNo, setAllowedNewFileNo] = useState(
    fileNo - (oldData?.length || 0),
  );
  useEffect(() => {
    if (isUpdate && oldData) {
      if (oldData && oldData.length > 0) {
        let list: UploadFile[] = [];
        oldData?.forEach((img: { name: string; url: string }) => {
          //@ts-ignore
          let sImage: UploadFile = {
            "aria-label": undefined,
            "aria-labelledby": undefined,
            name: img?.name,
            response: undefined,
            uid: "",
            xhr: undefined,
            url: img?.url,
          };
          list.push(sImage);
        });
        setOldImgList(list);
        console.log("the old data i---}", list);
        setRemovedImages([]);
      }
    }
  }, [isUpdate, oldData]);

  /**
   * ==========================     NEW FILES ADDED ======
   */
  const [addedFileList, setAddedFileList] = useState<UploadFile[]>([]);
  // const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   setImgList(newFileList)
  // }
  const onChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      // if (file["rejected"] != true)
      return file;
    });
    setAddedFileList(newFileList);
  };

  const mutation = useMutate();

  const operate = async (url: string, data, method: MTD) => {
    try {
      // @ts-ignore
      const datas = await mutation.mutateAsync({
        url,
        method: method,
        body: data,
        headers: AppHeaders.MULTIPART,
      });
      return datas;
    } catch (e: any) {
      console.log("````````````````````error data", e);
      toast.error(`Uploading file Error: ${e?.message}`);
      return { body: [] };
    }
  };
  // for making post requests
  const uploadImages = async () => {
    const formData = new FormData();
    if (!addedFileList.length && !oldImgList.length) {
      return message.error("at least one file is required");
    }
    // else if (!("url" in imgList[0]) && !isJpgOrPng(imgList[0])) {
    //   return message.error("Book cover can only be JPG/PNG file!")
    // }
    addedFileList.forEach((file) => {
      if (!("url" in file)) {
        formData.append("file", file.originFileObj as Blob);
      }
    });
    removedImages.forEach((img) => {
      formData.append("filesToRemove[]", img.name);
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(`Field name: ${key}`)
    //   console.log(`Field value: ${value}`)
    // }

    const data = await operate("upload/multiUpload", formData, MTD.POST);
    // console.log("return data is====", data)
    const fileNames: string[] = [];

    if (data && data.body) {
      data.body.forEach((img: { name: string }) => {
        fileNames.push(img.name);
      });
    }
    if (oldImgList.length > 0) {
      oldImgList.forEach((img) => {
        fileNames.push(img.name);
      });
    }

    return fileNames;
  };
  useImperativeHandle(ref, () => ({
    uploadAndReturnFileNames: uploadImages,
  }));

  /**
   * ==---------------->    states related to PREVIEW
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
  // !----------  END OF STATES RELATED TO PREVIEW   ---------!
  const uploadButton = (
    <div>
      <Button type="dashed" disabled={isLoading}>
        {isLoading ? "...Loading" : "Add file"}{" "}
      </Button>
    </div>
  );
  return (
    <div className={"my-8"}>
      {/* this is to display old images*/}
      {oldImgList.length > 0 && <div></div>}
      <Upload
        beforeUpload={imgOnly ? beforeImageUpload : beforeUpload}
        listType={"picture-card"}
        fileList={oldImgList}
        onPreview={handlePreview}
        // onChange={onChange}
        // maxCount={fileNo}
        onRemove={onRemove}
      >
        {/*{imgList.length < fileNo && uploadButton}*/}
      </Upload>
      {/* =======================  this is to display Removed images images*/}
      {removedImages.length > 0 && (
        <div>Warning : These files are about to be Removed</div>
      )}
      <Upload
        beforeUpload={beforeUpload}
        listType={"picture-circle"}
        fileList={removedImages}
        onPreview={handlePreview}
        // onChange={onChange}
        // maxCount={fileNo}
        onRemove={onReAdd}
      >
        {/*{imgList.length < fileNo && uploadButton}*/}
      </Upload>

      {/*   ================ ||    This is To Display New Added Images*/}
      <div className={"grayscale-0"}> New Files</div>
      <Upload
        beforeUpload={imgOnly ? beforeImageUpload : beforeUpload}
        listType={imgOnly ? "picture-card" : "picture"}
        fileList={addedFileList}
        onPreview={handlePreview}
        onChange={onChange}
        maxCount={fileNo}
        // onRemove={onRemove}
      >
        {addedFileList.length < fileNo && uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
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
    </div>
  );
});
