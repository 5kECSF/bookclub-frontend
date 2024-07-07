import { AlertModal } from "@/app/admin/_components/ui/AlertModal";
import { GenericButton } from "@/app/admin/_components/ui/genericButton";
import { Tag } from "antd";
import {
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType,
  Plus,
} from "lucide-react";
import React, { ReactNode } from "react";

import { Avatar } from "antd";

type FileExtension = "pdf" | "jpg" | "png" | "doc" | "docx" | "csv" | "js";
type FileIconComponent = React.ReactNode | React.JSX.Element;
type FileIconMap = Record<FileExtension, FileIconComponent>;
const fileIconMap: FileIconMap = {
  pdf: <FileText />,
  jpg: <FileImage />,
  png: <FileImage />,
  doc: <FileType />,
  docx: <FileType />,
  csv: <FileSpreadsheet />,
  js: <FileCode2 />,
  // Add more mappings as needed
};

//for genre column
export const FileList = ({ files }: { files: any }) => {
  return (
    <div className="flex flex-col space-y-2">
      {files.map((file: any, index: number) => {
        // Extract file extension
        const extension: FileExtension = file.name
          .split(".")
          .pop()
          .toLowerCase();
        // Get the icon based on the extension
        const Icon = fileIconMap[extension] || <FileType />; // Default icon if not found
        return (
          <div key={index} className="flex items-center space-x-2">
            {Icon}
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {file.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};

//for genre column
export const Fileicon = ({ files }: { files: any }) => {
  return <Avatar src={files?.url} />;
};

export const MultiItem = ({ list }: { list: any }) => {
  const data = list && list.length > 0 ? list : [];
  const colors = ["green", "blue", "orange", "red"];
  return (
    <>
      {data.map((item: string, idx: number) => (
        <span key={idx}>
          <Tag color={colors[idx % colors.length]}>{item}</Tag>
          {/*<div*/}
          {/*  key={idx}*/}
          {/*  class={`mr-1 text-xs inline-flex items-center leading-sm px-2 py-1 bg-${colors[idx % colors.length]}-200 text-${colors[idx % colors.length]}-700 rounded-full`}*/}
          {/*>*/}
          {/*  {item}*/}
          {/*</div>*/}
        </span>
      ))}
    </>
  );
};

export const MultiName = ({ list }: { list: any }) => {
  const data = list && list.length > 0 ? list : [];
  const colors = ["green", "blue", "orange", "red"];
  return (
    <>
      {data.map((item: { name: string }, idx: number) => (
        <span key={idx}>
          <Tag color={colors[idx % colors.length]}>{item?.name}</Tag>
          {/*<div*/}
          {/*  key={idx}*/}
          {/*  class={`mr-1 text-xs inline-flex items-center leading-sm px-2 py-1 bg-${colors[idx % colors.length]}-200 text-${colors[idx % colors.length]}-700 rounded-full`}*/}
          {/*>*/}
          {/*  {item}*/}
          {/*</div>*/}
        </span>
      ))}
    </>
  );
};

// @ts-ignore
export const MultiSubContent = ({ list, first }) => {
  const data = list && list.length > 0 ? list : [];
  const colors = ["green", "blue", "orange", "red"];
  return (
    <>
      {data.map((item: any, idx: number) => (
        <span key={idx}>
          <Tag color={colors[idx % colors.length]}>{item[first]["name"]}</Tag>
          {/*<div*/}
          {/*  key={idx}*/}
          {/*  class={`mr-1 text-xs inline-flex items-center leading-sm px-2 py-1 bg-${colors[idx % colors.length]}-200 text-${colors[idx % colors.length]}-700 rounded-full`}*/}
          {/*>*/}
          {/*  {item}*/}
          {/*</div>*/}
        </span>
      ))}
    </>
  );
};

/**
--------------------------   Action Columns
 */

export function CellUi({
  onEditClick,
  onDeleteClick,
  onDeleteModalClose,
  open,
  name,
  isPending,
  children,
  onConfirm,
}: {
  onEditClick: any;
  onDeleteClick: any;
  onConfirm: any;
  onDeleteModalClose: any;
  open: any;
  name: string;
  isPending: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      {/* ----------   edit Delete buttons*/}
      <div className="flex gap-2">
        <GenericButton
          onClick={onEditClick}
          className="text-white [background:linear-gradient(161.68deg,_#3498db,_#2980b9)] "
        >
          Edit
        </GenericButton>
        <GenericButton
          intent={"outline"}
          data-type="delete-knowledge-btn"
          onClick={onDeleteClick}
          className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
        >
          Delete
        </GenericButton>
      </div>
      {/*-----------  delete modal*/}
      <AlertModal
        name={name}
        dataTest="delete-knowledge-modal"
        loading={isPending}
        isOpen={open}
        onClose={onDeleteModalClose}
        onConfirm={onConfirm}
      />
      {children}
    </div>
  );
}

export function AddButton(props: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-between px-8">
      <GenericButton
        data-test="create-knowledge-button"
        onClick={props.onClick}
        className="text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
      >
        <Plus className="mr-2 h-4 w-4" /> Add New
      </GenericButton>
    </div>
  );
}
