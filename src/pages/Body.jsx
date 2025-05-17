import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import avatar from "../assets/images//user.png";
import Dashboard from "./dashboard/Dashboard";
import ManageUsers from "./manageUsers/ManageUsers";
import DeleteModal from "../components/DeleteModal";
import {
  IconActiveCategories,
  IconActiveDashboard,
  IconActiveManageUsers,
  IconActiveProductListing,
  IconActiveSettings,
  IconActiveTransaction,
  IconCategories,
  IconDashboard,
  IconManageUsers,
  IconProductListing,
  IconSettings,
  IconTransaction,
} from "../assets/icons/Icons";
import logo from "../assets/images/logo.png";
import ProductListing from "./productListing/ProductListing";
import Transactions from "./transactions/Transactions";
import Categories from "./categories/Categories";
import Settings from "./settings/Settings";
import { useNavigate } from "react-router-dom";
import { useCheckTokenQuery, useLogoutMutation } from "../redux/api/ApiSlice";

const { Header, Content, Sider } = Layout;

const Body = () => {
  const [selectedTitle, setSelectedTitle] = useState("Dashboard");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Dashboard"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Dashboard
        </span>
      ),
      key: "1",
      icon:
        selectedTitle?.props?.children === "Dashboard" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveDashboard }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconDashboard }} />
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Manage Users"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Manage Users
        </span>
      ),
      key: "2",
      icon:
        selectedTitle?.props?.children === "Manage Users" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveManageUsers }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconManageUsers }} />
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Product Listing"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Product Listing
        </span>
      ),
      key: "3",
      icon:
        selectedTitle?.props?.children === "Product Listing" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveProductListing }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconProductListing }} />
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Transactions"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Transactions
        </span>
      ),
      key: "4",
      icon:
        selectedTitle?.props?.children === "Transactions" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveTransaction }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconTransaction }} />
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Categories"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Categories
        </span>
      ),
      key: "5",
      icon:
        selectedTitle?.props?.children === "Categories" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveCategories }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconCategories }} />
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Settings"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Settings
        </span>
      ),
      key: "6",
      icon:
        selectedTitle?.props?.children === "Settings" ? (
          <div dangerouslySetInnerHTML={{ __html: IconActiveSettings }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: IconSettings }} />
        ),
    },
  ];

  // rtk query hooks
  const [logout] = useLogoutMutation();

  const onMenuSelect = ({ keyPath }) => {
    const selectedItem = items
      .flatMap((item) => item.children || item)
      .find((item) => item.key === keyPath[0]);
    if (selectedItem) {
      setSelectedTitle(selectedItem.label);
    }
  };

  // handler for logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout({});
      console.log("Response: ", response);
      if (response?.data?.status) {
        setIsLogoutModalVisible(false);
        navigate("/login");
      } else {
        alert("Logout Failed", "An error occurred while logging out.");
      }
    } catch (err) {
      console.log("Error details:", err);
      alert("Logout Failed", "Please try again later.");
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider className="bg-[#ffffff] p-4 w-[50%]">
        <div>
          <div className="flex flex-row items-center justify-center mb-8 mt-4">
            <img src={logo} alt="logo" className="w-18" />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onSelect={onMenuSelect}
            className="w-full"
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2" role="menuitem">
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-2xl" />
            <div>
              <h1 className="text-secondaryTitle text-sm font-work font-bold">
                Elina
              </h1>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsLogoutModalVisible(true);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 7L9.5 10.25M12.5 7L9.5 4M12.5 7L3 7M7 13L0.5 13L0.500001 1L7 1"
                stroke="#D34635"
              />
            </svg>
          </div>

          <Modal
            open={isLogoutModalVisible}
            width={"20%"}
            onCancel={() => setIsLogoutModalVisible(false)}
            onOk={() => setIsLogoutModalVisible(false)}
          >
            <h1 className="text-black text-xl font-semibold text-center">
              {"Are you sure ?"}
            </h1>
            <p className="text-black text-sm font-semibold text-center">
              Are you sure you want to log out?
            </p>

            <div className="flex flex-row items-center justify-between mt-6">
              <button
                type="button"
                className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-danger bg-transparent border border-transparent"
                onClick={() => setIsLogoutModalVisible(false)}
              >
                cancel
              </button>
            </div>
          </Modal>
        </div>
      </Sider>
      <Layout className="bg-offBg w-[50%]">
        <Header className="bg-offBg p-0 ml-4 pt-4 flex-row flex items-center justify-between mr-4">
          <h1 className="text-gray70 text-4xl font-work font-semibold">
            Hello, Elina 👋🏼
          </h1>
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="47" height="47" rx="12" fill="white" />
            <path
              d="M23.5 16C20.4624 16 18 18.4624 18 21.5V26H17V27H30V26H29V21.5C29 18.4624 26.5376 16 23.5 16Z"
              fill="#5D5D5D"
            />
            <path
              d="M21 28.5V28H26V28.5C26 29.8807 24.8807 31 23.5 31C22.1193 31 21 29.8807 21 28.5Z"
              fill="#5D5D5D"
            />
          </svg>
        </Header>
        <div></div>
        <Content className="m-4 bg-offBg rounded-lg p-6">
          {selectedTitle?.props?.children === "Manage Users" ? (
            <ManageUsers />
          ) : selectedTitle?.props?.children === "Product Listing" ? (
            <ProductListing />
          ) : selectedTitle?.props?.children === "Transactions" ? (
            <Transactions />
          ) : selectedTitle?.props?.children === "Categories" ? (
            <Categories />
          ) : selectedTitle?.props?.children === "Settings" ? (
            <Settings />
          ) : (
            <Dashboard />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
