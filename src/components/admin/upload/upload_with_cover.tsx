import {
  beforeImageUpload,
  beforeUpload,
  doesObjectExist,
  getBase64,
} from "@/components/admin/upload/image_util";
import { Headers, MTD, getImgUrl } from "@/lib/constants";
import { useMakeReq, useMutate } from "@/lib/state/hooks/useMutation";
import { IUpload } from "@/types/upload";
import { Modal, UploadFile, UploadProps, message } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import { Plus } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import {FAIL, NotModified, Resp, Succeed} from "@/lib/constants/return.const";
import {Button} from "@/components/ui/button";

export const FileWithCover = forwardRef(function UploadComp(
  {
    isLoading,
    isUpdate,
    maxFileNo,
    imgOnly = true,
    oldImg,
  }: {
    isLoading: boolean;
    imgOnly?: boolean;
    oldImg?: IUpload;
    isUpdate: boolean;
    maxFileNo: number;
  },
  ref,
) {
  const [coverImage, setCoverImage] = useState<UploadFile[]>([]);
  //secondary images list
  const [imgList, setImgList] = useState<UploadFile[]>([]);
  //list of images that are removed
  const [removedImages, setRemovedImages] = useState<UploadFile[]>([]);

  /**
   * ==========================     Cover Image   ================
   * =============================================================
   */
  const onCoverImageChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      // if (file["rejected"] != true)
      return file;
    });
    setCoverImage(newFileList);
  };
  /**
   * ==========================     Images List   ======
   * =============================================================*/

  const onNewImagesChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      // if (file["rejected"] != true)
      return file;
    });
    setImgList(newFileList);
  };

  /*** ============     Remove Images from images list  ======
   * =============================================================*/
  const onRemove = (file: UploadFile) => {
    if (
      file?.url &&
      file.name &&
      !doesObjectExist(file?.name as string, removedImages)
    ) {
      //remove it from the old images list
      const filteredList = imgList.filter(
        (oldImg) => oldImg.name !== file.name,
      );
      setImgList(filteredList);
      // --------- add it ot the removed images list
      setRemovedImages([...removedImages, file]);
    }
    console.log("rmvd--", removedImages);
  };

  /*** ============     Re Add Removed Images   ======
   * =============================================================*/

  const onReAdd = (file: UploadFile) => {
    if (imgList.length >= maxFileNo) {
      toast.warning("you must first remove the added image");
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
    if (isUpdate && oldImg) {
      let sImage: UploadFile = {
        "aria-label": undefined,
        "aria-labelledby": undefined,
        name: oldImg.fileName,
        response: undefined,
        uid: "",
        xhr: undefined,
        url: getImgUrl(oldImg.fileName, oldImg.pathId),
      };
      setCoverImage([sImage]);

      if (oldImg?.images && oldImg?.images.length > 0) {
        let list: UploadFile[] = [];
        oldImg?.images?.forEach((imgName) => {
          let sImage: UploadFile = {
            "aria-label": undefined,
            "aria-labelledby": undefined,
            name: imgName,
            response: undefined,
            uid: "",
            xhr: undefined,
            url: getImgUrl(imgName, oldImg.pathId),
          };
          list.push(sImage);
        });
        setImgList(list);
        console.log("the old data i---}", list);
        setRemovedImages([]);
      }
    }
  }, [isUpdate, oldImg]);

  /**==================================================================
   * ==---------------->    Http Functions
   * ==========================================================
   */
  const makeReq = useMakeReq();

  const resetData = () => {
    setImgList([]);
    setCoverImage([]);
    setRemovedImages([]);
  };
  // for making post requests
  const uploadImages = async (fileId: string): Promise<Resp<any>> => {
    console.log("---- uploading images||", fileId);
    const formData = new FormData();
    if (!coverImage.length) return FAIL("the cover image is required");

    //if it is a file(not just Url, files dont have url property)
    coverImage.forEach((file) => {
      if (!("url" in file)) {
        formData.append("cover", file.originFileObj as Blob);
      }
    });
    //if it is a file(not just Url, files don't have url property)
    imgList.forEach((file) => {
      if (!("url" in file)) {
        formData.append("images", file.originFileObj as Blob);
      }
    });
    removedImages.forEach((img) => {
      formData.append("removedImages", img.name);
    });
    //if the image is not updated, don't call the image upload function
    if (formData.entries().next().done) {
      if (isUpdate) return NotModified(imgList[0]);
    }
    if (isUpdate) {
      console.log("=====oldImg", oldImg, fileId);
      return await makeReq(
        `file/multi/${fileId}`,
        formData,
        MTD.PATCH,
        Headers.MULTI,
      );
    } else {
      let res = await makeReq(
        `file/multi/${fileId}`,
        formData,
        MTD.POST,
        Headers.MULTI,
      );
      console.log("the response is", res);
      return res;
    }
  };
  useImperativeHandle(ref, () => ({
    uploadFiles: uploadImages,
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
  /**==================================================================
   * ==---------------->    END OF STATES RELATED TO PREVIEW
   * ==========================================================
   */

  return (
    <div className={"my-8"}>
      {/* -----------------------   COVER IMAGE
      ------------------------------------------------------------------------*/}
      <Upload
        beforeUpload={imgOnly ? beforeImageUpload : beforeUpload}
        listType={"picture-circle"}
        fileList={coverImage}
        onPreview={handlePreview}
        onChange={onCoverImageChange}
        maxCount={1}
      >
        {coverImage.length < 1 && (
          <UploadButton isLoading={isLoading} txt="Add Cover" />
        )}
      </Upload>

      {/*   -------------------    list of Images  0000000000000000
      =====================================================================================*/}
      <div className={"grayscale-0"}> New Files</div>
      <Upload
        beforeUpload={imgOnly ? beforeImageUpload : beforeUpload}
        listType={imgOnly ? "picture-card" : "picture"}
        onPreview={handlePreview}
        fileList={imgList}
        onChange={onNewImagesChange}
        maxCount={maxFileNo}
        onRemove={onRemove}
      >
        {imgList.length < maxFileNo && (
          <UploadButton
            isLoading={isLoading}
            txt={`Add Images( max ${maxFileNo})`}
          />
        )}
      </Upload>

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Removed images -XXXXXXXXXXXXXXXXXXXXXXX
       =====================================================================*/}
      {removedImages.length > 0 && (
        <div className={"mt-6 border-t-4 text-red"}>
          Warning : These Uploaded files are about to be Removed
        </div>
      )}
      <Upload
        beforeUpload={beforeUpload}
        listType={"picture"}
        fileList={removedImages}
        onPreview={handlePreview}
        onRemove={onReAdd}
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

export const UploadButton = ({
  txt,
  isLoading,
}: {
  txt: string;
  isLoading: boolean;
}) => (
  <div>
    <Button
      // icon={}
      // type="dashed"
      disabled={isLoading}
    >
      <Plus size={15} strokeWidth={1.75} />
      {isLoading ? "...Loading" : txt}{" "}
    </Button>
  </div>
);
