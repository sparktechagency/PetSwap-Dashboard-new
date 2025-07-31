import {
  ExclamationCircleOutlined,
  InboxOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSliderQuery,
  useUpdateSliderMutation,
} from "../../redux/api/ApiSlice";
import { Button, Image, Modal, Upload, message } from "antd";
import { useRef, useState } from "react";
import { Modal as AntdModal } from "antd";
function Sliders() {
  const {
    data: sliders,
    isLoading: sliderLoading,
    refetch,
  } = useGetSliderQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // For Modal Dragger file
  const fileInputRef = useRef(null); // For individual slider file update
  const [createSLider] = useCreateSliderMutation();
  const [updateSliderData] = useUpdateSliderMutation();
  const [deleteSliderData] = useDeleteSliderMutation();
  const [fileList, setFileList] = useState([]);
  const { Dragger } = Upload;

  const handleUpdateFileChange = (e, sliderId) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`Updating slider ID: ${sliderId}`, file);
      uploadSliderFile(file, sliderId);
    }
  };

  const uploadSliderFile = async (file, sliderId = null) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("image", file);

      const response = await updateSliderData({
        id: sliderId,
        body: formData,
      }).unwrap();

      refetch();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const props = {
    name: "file",
    multiple: false,
    fileList, // Controlled file list
    beforeUpload: (file) => {
      setSelectedFile(file);
      setFileList([file]); // Update AntD's file list
      return false; // Prevent auto upload
    },
    onRemove: () => {
      setSelectedFile(null);
      setFileList([]);
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        setFileList([file]);
        console.log("Dropped file:", file);
      }
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const sliderId = fileInputRef.current.dataset.sliderId;
    if (file) {
      console.log(`Updating slider ID: ${sliderId}`, file);
      uploadSliderFile(file, sliderId);
    }
  };
  const handleDelete = (sliderId) => {
    AntdModal.confirm({
      title: "Are you sure you want to delete this slider?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This action cannot be undone. The slider will be permanently removed.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          const response = await deleteSliderData({ id: sliderId }).unwrap();
          console.log(response);
          refetch();
          message.success("Slider deleted successfully!");
        } catch (error) {
          console.error(error);
          message.error("Failed to delete the slider!");
        }
      },
    });
  };

  const handleUploadConfirm = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const response = await createSLider(formData).unwrap();
        console.log(response);
        refetch();
        message.success("Upload successful!");

        setFileList([]);
        setSelectedFile(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
        message.error("Upload failed!");
      }
    } else {
      message.warning("Please select a file first!");
    }
  };
  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="font-bold text-2xl">Manage Sliders</h2>

      <div className="flex justify-end items-center mt-6">
        <Button
          variant="solid"
          type="primary"
          className="bg-green-700 hover:!bg-green-700/80"
          onClick={showModal}
        >
          <PlusCircleOutlined /> Add new Slider
        </Button>

        <Modal
          title={<span className="font-bold">Create Slider</span>}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null} // Custom Footer
        >
          <Dragger {...props} multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. No restricted files allowed.
            </p>
          </Dragger>

          <div className="flex justify-end mt-6">
            <Button
              className="bg-green-700 hover:!bg-green-700/80"
              variant="solid"
              type="primary"
              onClick={handleUploadConfirm}
            >
              Confirm Upload
            </Button>
          </div>
        </Modal>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="w-full mt-6">
        {sliderLoading ? (
          <div>
            <LoadingOutlined className="animate-spin" />
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-6">
            {sliders.data.data.map((x) => (
              <div key={x.id} className="border rounded-lg overflow-hidden">
                <div className="w-full h-48 aspect-video overflow-hidden">
                  <Image src={x.image} className="w-full object-cover h-full" />
                </div>
                <div className="p-4 flex justify-between items-center gap-2">
                  <label className="cursor-pointer bg-green-700 text-white py-1 px-4 rounded hover:bg-green-700/80">
                    Update
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpdateFileChange(e, x.id)}
                    />
                  </label>
                  <Button
                    variant="solid"
                    type="primary"
                    danger
                    onClick={() => handleDelete(x.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sliders;
