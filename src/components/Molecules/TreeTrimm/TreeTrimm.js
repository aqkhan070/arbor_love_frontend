import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateService } from "@/store/quoteSlice";

function removeContentAfterLastDash(url) {
  const lastDashIndex = url.lastIndexOf("-");
  if (lastDashIndex !== -1) {
    return url.substring(0, lastDashIndex);
  }
  return url;
}


export default function TreeTrimm({ setPhotoInfoVisible }) {
  const dispatch = useDispatch();
  const { index } = useSelector((state) => state.quote);
  const currentService = useSelector((state) => state.quote.services[index]);

  const [fileList, setFileList] = useState({});

  useEffect(() => {
    // Initialize fileList for each tree from imageUrls
    if (currentService?.imageUrls) {
      const initialFiles = {};
      Object.keys(currentService.imageUrls).forEach((treeIdx) => {
        initialFiles[treeIdx] = currentService.imageUrls[treeIdx].map((url, idx) => ({
          uid: `${treeIdx}-${idx}`,
          name: `Tree ${parseInt(treeIdx) + 1} Image ${idx + 1}`,
          status: "done",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
          
        }));
      });
      setFileList(initialFiles);
    }
  }, [currentService?.imageUrls]);

  const handleChange = (newFileList, idx) => {
    setFileList((prevFileList) => ({
      ...prevFileList,
      [idx]: newFileList.fileList,
    }));
  };

  const handleRemove = (file, idx) => {
    const updatedImageUrls = {
      ...currentService.imageUrls,
      [idx]: currentService.imageUrls[idx].filter(
        (url) => url !== file.url && url !== file.response?.imageUrl
      ),
    };

    dispatch(
      updateService({
        index,
        service: { imageUrls: updatedImageUrls },
      })
    );
  };

  const handleUpload = (file, idx) => {
    console.log("file",file);
    // const imageUrl = removeContentAfterLastDash(file?.imageUrl);
    const imageUrl = file;
    console.log('imageURL',imageUrl)
    if (imageUrl) {
      const updatedImageUrls = {
        ...currentService.imageUrls,
        [idx]: [...(currentService.imageUrls[idx] || []), imageUrl],
      };

      dispatch(
        updateService({
          index,
          service: { imageUrls: updatedImageUrls },
        })
      );
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div className="flex gap-3 items-center mb-2 mt-10">
        <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]">
          {currentService?.serviceType === "Tree Trimming" ? "7" : "10"}
        </span>
        <h6 className="text-black text-[12px] font-semibold md:text-[21px]">
          Photos
        </h6>
      </div>

      <div className="pl-[42px] flex flex-col gap-4">
        {[...Array(currentService?.numOfTrees)].map((_, treeIdx) => (
          <div key={treeIdx}>
            {/* <h6 className="text-black text-[12px] mb-2">Tree {treeIdx + 1}</h6> */}
            <Upload
              listType="picture-card"
              fileList={fileList[treeIdx] || []}
              onChange={(newFileList) => handleChange(newFileList, treeIdx)}
              onRemove={(file) => handleRemove(file, treeIdx)}
              action={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`}
              accept={"image/*"}
              name="image"
              showUploadList={{
                showRemoveIcon: true,
                showPreviewIcon: false,
              }}
              headers={{
                authorization: "authorization-text",
              }}
              onSuccess={(file) => handleUpload(file, treeIdx)}
              onError={(err) => message.error(`Upload failed: ${err.message}`)}
            >
              {(fileList[treeIdx] || []).length < 3 && uploadButton}
            </Upload>
          </div>
        ))}
      </div>
    </>
  );
}
