import {
  beforeImageUpload,
  beforeUpload,
  doesObjectExist,
  getBase64,
} from "@/app/admin/_components/upload/image_util";
import { Headers, MTD, getImg } from "@/lib/constants";
import { useMakeReq, useMutate } from "@/lib/state/hooks/useMutation";
import { Modal, UploadFile, UploadProps, message } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";

import { UploadButton } from "@/app/admin/_components/upload/upload_with_cover";
import { RotateCcw } from "lucide-react";
import { IUpload } from "@/types/upload";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { FAIL, NotModified, Resp, Succeed } from "@/lib/constants/return.const";
export const MultiFileUpload = forwardRef(function UploadComp(
  {
    isLoading,
    isUpdate,
    maxFileNo,
    imgOnly,
    oldData,
    fileId,
  }: {
    isLoading: boolean;
    imgOnly: boolean;
    oldData: any;
    isUpdate: boolean;
    maxFileNo: number;
    fileId?: string;
  },
  ref,
) {
  /**
   * ==========================     Images List  ======
   * =============================================================
   */
  const [imgList, setImgList] = useState<UploadFile[]>([]);
  //remove image from the existing images
  const onOldRemove = (file: UploadFile) => {
    if (
      file?.url &&
      file.name &&
      !doesObjectExist(file?.name as string, removedImages)
    ) {
      // add it ot the removed images list
      setRemovedImages([...removedImages, file]);
      //remove it from the old images list
      const filteredList = imgList.filter(
        (oldImg) => oldImg.name !== file.name,
      );
      setImgList(filteredList);
    }
    console.log("rmvd--", removedImages);
  };

  const onNewFileChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    // if (oldImgList.length >= maxFileNo) {
    //   toast.warning("Maximum file Has Reached");
    //   return;
    // }
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setImgList(newFileList);
    // setAddedFileList(newFileList);
  };

  /**
   * ==========================     Removed Images   ======
   * =============================================================
   */

  const [removedImages, setRemovedImages] = useState<UploadFile[]>([]);

  // re-add removed image
  const onReAdd = (file: UploadFile) => {
    if (imgList.length >= maxFileNo) {
      toast.warning(
        "Max files has Reached, remove added image to restore this",
      );
      return;
    }
    if (
      file?.url &&
      file.name &&
      !doesObjectExist(file?.name as string, imgList)
    ) {
      // add it ot the Main Images List
      setImgList([...imgList, file]);
      //remove it from the removed Images List
      const filteredList = removedImages.filter(
        (oldImg) => oldImg.name !== file.name,
      );
      setRemovedImages(filteredList);
    }
    console.log("rmvd--", removedImages);
  };

  useEffect(() => {
    if (isUpdate && oldData) {
      if (oldData && oldData.length > 0) {
        let list: UploadFile[] = [];
        oldData?.forEach((img: IUpload) => {
          //@ts-ignore
          let sImage: UploadFile = {
            "aria-label": undefined,
            "aria-labelledby": undefined,
            name: img?.fileName,
            response: undefined,
            //FIXME this might change on Elements projects with no ID
            uid: img._id as string,
            xhr: undefined,
            url: getImg(img),
          };
          list.push(sImage);
        });
        setImgList(list);
        // console.log("the old data i---}", list);
        setRemovedImages([]);
      }
    }
  }, [isUpdate, oldData]);

  /**==================================================================
   * ==---------------->    Http Functions
   * ==========================================================
   */
  const mutation = useMutate();
  const makeReq = useMakeReq();

  // for making post requests
  const uploadImages = async (id: string): Promise<Resp<any>> => {
    const formData = new FormData();
    if (!imgList.length) return FAIL("the cover image is required");

    imgList.forEach((file) => {
      if (!("url" in file)) {
        formData.append("file", file.originFileObj as Blob);
      }
    });
    //this don't matter for single images
    removedImages.forEach((img) => {
      formData.append("removedImages", img.name);
    });
    //TODO if the image is not updated, dont call the image upload function
    if (formData.entries().next().done) {
      let newData: any = imgList[0];
      newData._id = newData.uid;
      if (isUpdate) return NotModified(imgList[0]);
    }
    // let data: IUpload;
    if (isUpdate) {
      return makeReq(`file/${id}`, formData, MTD.PATCH, Headers.MULTI);
    } else {
      return makeReq(`file/${id}`, formData, MTD.POST, Headers.MULTI);
    }
  };
  const operate = async (url: string, data: any, method: MTD) => {
    try {
      // @ts-ignore
      const datas = await mutation.mutateAsync({
        url,
        method: method,
        body: data,
        headers: Headers.MULTI,
      });
      return datas;
    } catch (e: any) {
      let resp = HandleAxiosErr(e);
      console.log("````````````````````error data", e);
      toast.error(`Uploading file Error: ${resp.Message}`);
      return null;
    }
  };
  const resetData = () => {
    setImgList([]);
    setRemovedImages([]);
  };
  useImperativeHandle(ref, () => ({
    uploadSingle: uploadImages,
    resetData,
  }));

  /**==================================================================
   * ==---------------->    states related to PREVIEW
   * ==========================================================
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
  //=============================================================

  return (
    <div className={"my-8"}>
      {/*   ================ ||    DISPLAY IMAGES ====================*/}
      <Upload
        beforeUpload={imgOnly ? beforeImageUpload : beforeUpload}
        listType={imgOnly ? "picture-card" : "picture-circle"}
        fileList={imgList}
        onPreview={handlePreview}
        maxCount={maxFileNo}
        onChange={onNewFileChange}
        onRemove={onOldRemove}
      >
        {/*{addedFileList.length + oldImgList.length < maxFileNo  && (*/}
        {imgList.length < maxFileNo && (
          <UploadButton isLoading={isLoading} txt="Add Image" />
        )}
      </Upload>

      {/* =======================  this is to display Removed images images*/}
      {removedImages.length > 0 && (
        <div className={"mt-6 border-t-4 text-red"}>
          Warning : These Uploaded files below are about to be deleted
        </div>
      )}
      <Upload
        beforeUpload={beforeUpload}
        listType={"picture"}
        fileList={removedImages}
        onPreview={handlePreview}
        onRemove={onReAdd}
        {...props}
      ></Upload>
      {/*====================================   Modal ============================*/}

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
const props: UploadProps = {
  showUploadList: {
    showRemoveIcon: true,
    removeIcon: (
      <RotateCcw size={20} strokeWidth={1.75}>
        restore
      </RotateCcw>
    ),
  },
};
