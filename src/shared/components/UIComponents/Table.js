import { Icon } from "@iconify/react";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";

const Table = ({
  user,
  viewPermission,
  updatePermission,
  deletePermission,
  headers,
  data,
  showActions = {
    edit: false,
    delete: false,
    view: false,
    add: false,
    total: false,
  },
  handleActionClick,
  useV2 = false,
  currentPage,
  totalPages,
  itemsPerPage,
  setPage,
//   totalAssignStudent,
}) => {
  const [currentPageValue, setCurrentPageValue] = useState(currentPage);

  const [keysSort, setKeysSort] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const pathname = useLocation().pathname;
  const studentPath = pathname?.split("/")?.[2];
  const getItemData = (rowItem, itemKey, headerItem = null) => {
    let keys = itemKey.split(".");
    let item = "";
    let tempItem = { ...rowItem };
    keys.forEach((key, index) => {
      tempItem = tempItem[key];
      item = tempItem;
    });

    let res = headerItem?.type === "date" ? item?.split("T")[0] : item;
    if (useV2 && rowItem?.useRender) {
      res = headerItem.render(item, rowItem);
    }

    return res;
  };

  const shouldShowActions = (item) => {
    if (useV2) {
      return item?.showActions;
    } else {
      return (
        showActions.edit ||
        showActions.delete ||
        showActions.view ||
        showActions.add
      );
    }
  };

  const startIndex = (currentPageValue - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const userPermission = user?.permissions;

  useEffect(() => {
    setRows(data);

    let keysArr = [];
    headers?.map((item) => {
      keysArr.push(0);
    });

    setKeysSort(keysArr);
  }, [data]);

  const isValidDate = (dateString) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    return !isNaN(date) && date.toISOString().slice(0, 10) === dateString;
  };

  let sortFuncHelper = (key, a, b, reverse) => {
    let initval = a[key];
    if (typeof initval === "string" && !isValidDate(initval)) {
      let fa = a[key]?.toLowerCase(),
        fb = b[key]?.toLowerCase();

      if (fa < fb) {
        return reverse ? 1 : -1;
      }
      if (fa > fb) {
        return reverse ? -1 : 1;
      }
      return 0;
    } else if (typeof initval === "number") {
      return reverse ? b[key] - a[key] : a[key] - b[key];
    } else {
      let date = new Date(initval);
      if (date instanceof Date && !isNaN(date.valueOf())) {
        let da = new Date(a[key]);
        let db = new Date(b[key]);
        return reverse ? db - da : da - db;
      } else {
        return 0;
      }
    }
  };

  const sortFunc = (key, index) => {
    let keysArr = [...keysSort];
    if (keysArr[index] + 1 > 2) {
      keysArr[index] = 0;
    } else {
      keysArr[index] = keysArr[index] + 1;
    }

    let tempRows = [];
    if (keysArr[index] === 0) {
      tempRows = [...data];
    } else {
      let reverse = keysArr[index] === 1;
      tempRows = [...data];
      tempRows = tempRows.sort((a, b) => {
        return sortFuncHelper(key, a, b, reverse);
      });
    }
    setRows(tempRows);
    setKeysSort(keysArr);
  };

  let getSortIconStr = (val) => {
    if (val === 0) {
      //none
      return "system-uicons:sort";
    } else if (val === 1) {
      //descending
      return "tabler:arrow-down";
    } else if (val === 2) {
      //ascending
      return "tabler:arrow-up";
    }
  };

  if (data === undefined) {
    return <Loader forProcess={true} />;
  } else
    return (
      <div className="relative">
        <table className="table-auto w-[100%]">
          <thead>
            <tr className="text-left text-[14px] bg-secondary font-medium">
              <th className="font-medium py-2 pl-2">SI</th>
              {headers.map((x, index) => (
                <th key={index} className="font-medium py-2 pl-2">
                  <div className="flex items-center gap-1">
                    {x.name}
                    {
                      <Icon
                        icon={`${getSortIconStr(keysSort[index])}`}
                        width="20"
                        className=" cursor-pointer"
                        onClick={() => sortFunc(x.key, index)}
                      />
                    }
                  </div>
                </th>
              ))}
              {(showActions.edit ||
                showActions.delete ||
                showActions.view ||
                showActions.add ||
                showActions.accounts) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows?.map((item, index) => (
              <tr
                key={item._id + index}
                className={`
                    ${index % 2 === 0 ? "bg-[#FAFDFB]" : "bg-[#E4F2EB]"} 
                    py-2 text-[14px] font-medium cursor-pointer`}
                onClick={(e) => {
                  // console.log(e.target.classList.contains("account"));
                  studentPath === "student" &&
                    handleActionClick("edit", item._id);
                }}
              >
                <td className="pl-4 py-3 w-[5%]">
                  {currentPage ? index + 1 + (currentPage - 1) * 10 : index + 1}
                </td>
                {headers.map((x, index) => (
                  <td className="pl-2 py-3 ">
                    {getItemData(item, x.key, x) ?? "Unavailable"}
                  </td>
                ))}
                {shouldShowActions(item) ? (
                  <td className="pl-2 py-3 w-[100%] flex gap-2">
                    {showActions.add && (
                      <div title="Add">
                        <Icon
                          onClick={() => handleActionClick("add", item._id)}
                          icon="material-symbols:add-circle-outline-rounded"
                          className="text-[35px] text-green hover:cursor-pointer"
                        />
                      </div>
                    )}
                    {showActions.view && (
                      <div title="View">
                        <Icon
                          onClick={() => handleActionClick("view", item._id)}
                          icon="basil:eye-solid"
                          className="text-[30px] hover:scale-105 duration-75 text-gray hover:text-[#367BF5] mr-2"
                        />
                      </div>
                    )}
                    {showActions.edit && (
                      <div title="Edit">
                        <Icon
                          icon="material-symbols:edit-square-outline"
                          className="text-[22px] text-gray hover:text-brand hover:cursor-pointer"
                          onClick={() => handleActionClick("edit", item._id)}
                        />
                      </div>
                    )}
                    {showActions.delete && (
                      <div title="Delete">
                        <Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick("delete", item._id);
                          }}
                          icon="ic:outline-delete"
                          className="text-[24px] text-gray hover:text-red hover:cursor-pointer"
                        />
                      </div>
                    )}
                    {showActions.accounts && (
                      <div title="Accounts" className="account">
                        <Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick("accounts", item._id);
                          }}
                          icon="mdi:account-payment"
                          className="text-[24px]  text-gray hover:text-brand hover:cursor-pointer"
                        />
                      </div>
                    )}
                    {showActions.reports && (
                      <div title="Reports">
                        <Icon
                          onClick={() => handleActionClick("reports", item._id)}
                          icon="mdi:file-report-outline"
                          className="text-[24px]  text-gray hover:text-brand hover:cursor-pointer"
                        />
                      </div>
                    )}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {/* {showActions.total && (
          <div className="mt-5 grid grid-cols-4 py-3 bg-[#E4F2EB]">
            <h1 className="text-xl font-semibold">Total :</h1>
            <h1></h1>
            <h1></h1>
            <h1 className="text-xl font-semibold"> {totalAssignStudent}</h1>
          </div>
        )} */}

        <div className="sticky bg-white py-2 bottom-0 left-0 right-0">
          {currentPage ? (
            <Pagination
              currentPage={currentPageValue}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              setPage={setPage}
              setCurrentPage={setCurrentPageValue}
            />
          ) : null}
        </div>
      </div>
    );
};
const styles = {
  Input:
    "text-[14px] rounded-md my-0 outline-none font-regular py-2 pl-[35px] bg-gray bg-opacity-10",
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
  };
};

export default connect(mapStateToProps, null)(Table);
