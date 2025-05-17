import React, { useState } from "react";
import productImage from "../../assets/images/food.png";
import user from "../../assets/images/user.png";
import { IconEdit, IconTrash } from "../../assets/icons/Icons";
import { Modal, Radio } from "antd";
import {
  useChangeProductStatusMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/ApiSlice";
import { SearchOutlined } from "@ant-design/icons";

function ProductListing() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [productId, setProductId] = useState(null);
  const handleStatusUpdate = (e) => {
    console.log("radio checked", e.target.value);
    setProductStatus(e.target.value);
  };

  // rtk query hooks
  const { data: products } = useGetProductsQuery({
    page: activePage,
    perPage: 10,
    search: searchText,
  });

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const [changeProductStatus, { isLoading: isUpdatingStatus }] =
    useChangeProductStatusMutation();

  // handlers
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct({ id: productId });
      if (response?.data?.status === true) {
        setIsDeleteModalVisible(false);
      }
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  const handleUpdateProductStatus = async () => {
    try {
      const response = await changeProductStatus({
        id: productId,
        status: productStatus,
      });
      console.log("response of update product status", response);
      setIsEditModalVisible(false);
      setProductStatus("");
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  console.log("Products: ", productStatus);

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div>
        <div>
          <h1 className="text-black text-2xl font-semibold font-work mb-4">
            Product Listing
          </h1>
          <div
            className={`border border-90 px-4 mb-6 py-4 rounded-xl flex flex-row items-center gap-2`}
          >
            <SearchOutlined color="#24272B" />
            <input
              type="text"
              name=""
              id=""
              className=" focus:outline-none w-full"
              placeholder="Search product..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div>
            <table className="table-auto w-full">
              <thead className="bg-gray90 rounded-xl">
                <tr className="h-12">
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    User Name
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Product Name
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Price
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Brand
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Condition
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Status
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.data?.data?.map((item, index) => (
                  <tr
                    className="border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer"
                    key={index}
                  >
                    <td className="pl-4 flex flex-row items-center gap-2">
                      <div className="py-2">
                        <img
                          src={item?.user?.avatar || user}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <h1
                          className={`text-title text-sm font-work font-normal`}
                        >
                          {item?.user?.name || "N/A"}
                        </h1>
                      </div>
                    </td>
                    <td>
                      <div className="py-2 flex flex-row items-center gap-2">
                        <img
                          src={item?.images[0] || productImage}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <h1
                          className={`text-title text-sm font-work font-normal`}
                        >
                          {item?.title || "N/A"}
                        </h1>
                      </div>
                    </td>
                    <td>{item?.brand || "N/A"}</td>
                    <td>{item?.price || "N/A"}</td>
                    <td>{item?.condition || "N/A"}</td>
                    <td>
                      <button
                        className={`${
                          item?.status === "Canceled"
                            ? "bg-[#ffe9e9]"
                            : item?.status === "Approved"
                            ? "bg-[#dff8e1]"
                            : "bg-[#f3f0f0]"
                        } px-2 py-1 rounded-xl`}
                      >
                        {item?.status || "N/A"}
                      </button>
                    </td>
                    <td>
                      <div className="flex flex-row items-center gap-6">
                        <div
                          onClick={() => {
                            setIsDeleteModalVisible(true);
                            setProductId(item?.id);
                          }}
                          dangerouslySetInnerHTML={{ __html: IconTrash }}
                        />

                        <div
                          onClick={() => {
                            setProductId(item?.id);
                            setIsEditModalVisible(true);
                          }}
                          dangerouslySetInnerHTML={{ __html: IconEdit }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`mt-8 flex-row flex items-center justify-between`}>
              <div>
                <h1 className={`text-black text-sm font-nunito font-bold`}>
                  page {products?.data?.current_page || 1} of{" "}
                  {Math.floor(products?.data?.total / 10) + 1}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-3">
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    activePage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={activePage === 1 ? true : false}
                  onClick={() => {
                    setActivePage(activePage - 1);
                  }}
                >
                  Previous
                </button>
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    activePage === Math.floor(products?.data?.total / 10) + 1
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={
                    activePage === Math.floor(products?.data?.total / 10) + 1
                      ? true
                      : false
                  }
                  onClick={() => {
                    setActivePage(activePage + 1);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <Modal
              open={isDeleteModalVisible}
              width={"400px"}
              onCancel={() => setIsDeleteModalVisible(false)}
              onOk={() => setIsDeleteModalVisible(false)}
            >
              <h1 className="text-black text-2xl font-semibold font-work text-center mb-3">
                Delete Product
              </h1>
              <p className="text-gray100 text-sm font-work mt-1 font-normal text-center">
                If you delete the product, it will be permanently removed from
                your dashboard
              </p>

              <div className="mt-4 flex flex-row items-center justify-between">
                <button
                  className="text-danger text-base font-semibold px-4 py-2 rounded-xl"
                  onClick={handleDeleteProduct}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                  className="text-white text-base font-semibold bg-primary px-4 py-2 rounded-xl"
                  onClick={() => setIsDeleteModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>

            <Modal
              open={isEditModalVisible}
              onCancel={() => {
                setIsEditModalVisible(false);
              }}
              onOk={() => {
                setIsEditModalVisible(false);
              }}
              width={"400px"}
            >
              <h3 className="text-title text-lg font-work font-bold">
                Change product status
              </h3>
              <Radio.Group
                onChange={handleStatusUpdate}
                value={productStatus}
                size="large"
                className="mt-2 gap-y-2 flex flex-col"
              >
                <Radio className="block" value={"Approved"}>
                  Approved
                </Radio>
                <Radio className="block" value={"Canceled"}>
                  Cancelled
                </Radio>
              </Radio.Group>
              <button
                className="text-white text-base font-semibold bg-primary w-full py-2 rounded-xl mt-4"
                onClick={handleUpdateProductStatus}
              >
                {isUpdatingStatus ? "Updating..." : "Done"}
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
