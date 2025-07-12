import { useEffect, useState } from "react";
import { IconEdit } from "../../assets/icons/Icons";
import { Upload, Button, Image, message, Modal } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {BASE_URL} from "../../redux/config"
function Categories() {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [editable, setEditable] = useState(false);
  const [targetCat, setTargetCat] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);
  const [selectedSub, setSelectedSub] = useState(null);
  const token = localStorage.getItem("authToken");
  async function getData() {
    const call = await fetch(`${BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await call.json();

    if (res.data) {
      setCategories(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (targetCat !== null && targetCat !== undefined && editable) {
      console.log(targetCat);
      setCategoryName(categories[targetCat].name);
      setSubCategories(categories[targetCat].subcategories);
    }
  }, [categories, editable, targetCat]);

  useEffect(() => {
    setEditSubCategoryName(selectedSub?.name);
  }, [selectedSub]);

  // Custom request to handle file upload
  const customRequest = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      onSuccess("ok");
    };
    reader.onerror = () => message.error("Failed to load the image.");
    reader.readAsDataURL(file);
  };

  // Remove the uploaded image
  const handleRemove = () => {
    setImageUrl(null);
    message.success("Image removed successfully.");
  };

  // Add subcategory
  const handleAddSubCategory = () => {
    if (subCategoryName.trim() !== "") {
      const newSubCategory = {
        id: Date.now(),
        name: subCategoryName,
      };
      setSubCategories([...subCategories, newSubCategory]);
      setSubCategoryName(""); // Clear the subcategory input
    }
  };

  // Edit a specific subcategory
  const handleEditSubCategory = (subCategory) => {
    setEditSubCategory(subCategory); // Open modal with selected subcategory
    setEditSubCategoryName(subCategory.name); // Pre-fill input with existing name
  };

  // Save edited subcategory
  const handleSaveEditSubCategory = async () => {
    try {
      const call = await fetch(
        `${BASE_URL}/subcategory/${selectedSub?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _method: "PUT", name: editSubCategoryName }),
        }
      );
      setEditSubCategory(null);
      setEditSubCategoryName("");
      message.success("Subcategory updated successfully!");
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // Remove a subcategory
  const handleRemoveSubCategory = (id) => {
    const updatedSubCategories = subCategories.filter(
      (subCategory) => subCategory.id !== id
    );
    setSubCategories(updatedSubCategories);
  };

  // Submit the new category
  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      message.error("Category name cannot be empty.");
      return;
    }

    // Create FormData for both add and update operations
    const formData = new FormData();
    formData.append("name", categoryName);

    // Add subcategories as individual form fields with array indices
    subCategories.forEach((subCategory, index) => {
      formData.append(`subcategories[${index}]`, subCategory.name);
    });

    // Convert base64 to file if imageUrl exists
    if (imageUrl && imageUrl.startsWith("data:")) {
      // Extract the base64 data from the data URL
      const base64Data = imageUrl.split(",")[1];
      // Convert base64 to blob
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }

      const blob = new Blob([new Uint8Array(byteArrays)], {
        type: "image/png",
      });
      const file = new File([blob], "category-icon.png", { type: "image/png" });

      // Append the file to FormData
      formData.append("icon", file);
    }

    if (editable) {
      // For update, add the _method field
      formData.append("_method", "PUT");

      const call = await fetch(
        `http://182.252.68.227:8001/api/category/${categories[targetCat].id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type for FormData
          },
          body: formData,
        }
      );

      const res = await call.json();

      if (!res.status) {
        message.error(res.message);
        return;
      }

      console.log(res);
      message.success("Category updated successfully!");
      getData(); // Refresh the data
      setOpenAddCategoryModal(false);
    } else {
      const call = await fetch(`http://182.252.68.227:8001/api/category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData
        },
        body: formData,
      });

      const res = await call.json();

      if (!res.status) {
        message.error(res.message);
        return;
      }

      setOpenAddCategoryModal(false); // Close modal
      message.success("Category added successfully!");
      getData(); // Refresh the data
    }

    // Reset form
    setImageUrl(null);
    setCategoryName("");
    setSubCategories([]);
    setEditable(false);
  };

  // Remove a category
  const handleRemoveCategory = async () => {
    // const updatedCategories = categories.filter(
    //   (category) => category.id !== id
    // );
    // setCategories(updatedCategories);
    // alert(id);

    try {
      const call = await fetch(
        `http://182.252.68.227:8001/api/category/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await call.json();
      console.log(res);

      getData();
      setConfirmationModalVisible(false);
      message.success("Category removed successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-black text-2xl font-semibold font-work">
            Manage Preference Categories
          </h1>
          <p className="text-gray100 text-sm font-work mt-1 font-normal">
            Your categories & subcategories
          </p>
        </div>
      </div>

      {/* Categories Body */}
      <div className="flex flex-col mt-2 gap-y-3">
        {categories?.map((category, i) => (
          <div
            className="border border-primary rounded-2xl p-2 flex flex-row items-center justify-between"
            key={category.id}
          >
            <div>
              <div className="flex flex-row items-center gap-2">
                {category.icon && (
                  <img
                    src={category.icon || "/placeholder.svg"}
                    alt="Icon"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <h1 className="text-primary text-xl font-work font-semibold">
                  {category.name}
                </h1>
              </div>

              {/* Subcategories */}
              <div className="mt-2 flex flex-row items-center gap-2 flex-wrap">
                {category.subcategories.map((subCategory) => (
                  <div
                    className="bg-[#E6ECEC] p-2 rounded-2xl flex flex-row items-center gap-3"
                    key={subCategory.id}
                  >
                    <span className="text-sm font-work font-normal">
                      {subCategory.name}
                    </span>
                    <div
                      dangerouslySetInnerHTML={{ __html: IconEdit }}
                      onClick={() => {
                        setSelectedSub(subCategory);
                        handleEditSubCategory(subCategory.id);
                      }}
                    />
                    {/* <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="text-red-500"
                    >
                      <DeleteOutlined />
                    </button> */}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center gap-4">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setEditable(true);
                  setTargetCat(i);
                  setOpenAddCategoryModal(true);
                }}
                dangerouslySetInnerHTML={{ __html: IconEdit }}
              />
              <button
                onClick={() => {
                  setDeleteId(category.id);
                  setConfirmationModalVisible(true);
                }}
                className="text-red-500"
              >
                <DeleteOutlined />
              </button>
            </div>

            <Modal
              width={300}
              open={confirmationModalVisible}
              onCancel={() => setConfirmationModalVisible(false)}
              footer={null}
            >
              <h1 className="text-black text-2xl font-semibold font-work text-center">
                Delete Category
              </h1>
              <p className="text-gray100 text-sm font-work mt-1 font-normal text-center">
                Are you sure, you want to delete this category?
              </p>

              <div className="mt-4 flex flex-row items-center justify-between">
                <button
                  className="text-danger text-base font-semibold px-4 py-2 rounded-xl"
                  onClick={() => handleRemoveCategory(category.id)}
                >
                  Delete
                </button>
                <button
                  className="text-white text-base font-semibold bg-primary px-4 py-2 rounded-xl"
                  onClick={() => setConfirmationModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        ))}

        <button
          className="text-white text-base font-semibold bg-primary w-full py-3 rounded-xl mt-4"
          onClick={() => {
            setEditable(false);
            setCategoryName("");
            setSubCategories([]);
            setOpenAddCategoryModal(true);
          }}
        >
          Add a new category
        </button>
      </div>

      {/* Add Category Modal */}
      <Modal
        open={openAddCategoryModal}
        onCancel={() => setOpenAddCategoryModal(false)}
        footer={null}
      >
        <div>
          <h1 className="text-black text-2xl font-semibold font-work">
            {editable ? "Edit" : "Add a new"} category
          </h1>
          <div className="mt-4 flex flex-col items-center mb-3">
            <Upload
              customRequest={customRequest}
              showUploadList={false}
              accept="image/*"
            >
              {imageUrl && (
                <div className="relative">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Selected"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      border: "1px solid #064145",
                    }}
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    size="small"
                    style={{ position: "absolute", top: 10, right: 25 }}
                  />
                </div>
              )}
              <Button icon={<UploadOutlined />}>Select Category Icon</Button>
            </Upload>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-y-2">
            <div className="border border-primary rounded-xl p-2">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full focus:outline-none"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="border border-primary rounded-xl p-2 flex flex-row items-center">
              <input
                type="text"
                placeholder="Sub Category Name"
                className="w-full focus:outline-none"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
              />
              <button
                className="text-white text-xs font-semibold bg-primary px-2 py-1 rounded-xl"
                onClick={handleAddSubCategory}
              >
                Add
              </button>
            </div>

            {/* Subcategories */}
            <div className="mt-2 flex flex-row items-center gap-2 flex-wrap">
              {subCategories.map((subCategory) => (
                <div
                  className="bg-[#E6ECEC] p-2 rounded-2xl flex flex-row items-center gap-3"
                  key={subCategory.id}
                >
                  <span>{subCategory.name}</span>
                  {/* <button
                    onClick={() => handleRemoveSubCategory(subCategory.id)}
                    className="text-red-500"
                  >
                    <DeleteOutlined />
                  </button> */}
                </div>
              ))}
            </div>

            <button
              className="text-white text-base font-semibold bg-primary w-full py-3 rounded-xl mt-4"
              onClick={handleAddCategory}
            >
              {editable ? "Update" : "Add a new"} category
            </button>
          </div>
        </div>
      </Modal>

      {/* edit sub category */}
      <Modal
        open={!!editSubCategory}
        onCancel={() => setEditSubCategory(null)}
        footer={null}
      >
        <div>
          <h1 className="text-black text-2xl font-semibold font-work">
            Edit Subcategory
          </h1>
          <div className="flex-col flex gap-y-2 mt-4">
            <div className="border border-primary rounded-xl p-2">
              <input
                type="text"
                placeholder="Sub Category Name"
                className="w-full focus:outline-none"
                value={editSubCategoryName}
                // onLoad={setEditSubCategoryName(selectedSub)}
                onChange={(e) => setEditSubCategoryName(e.target.value)}
              />
            </div>

            <button
              className="text-white text-base font-semibold bg-primary w-full py-3 rounded-xl mt-4"
              onClick={handleSaveEditSubCategory}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Categories;
