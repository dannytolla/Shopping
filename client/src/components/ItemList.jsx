import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, updateStatus } from "../redux/itemSlice";
import CheckboxList from "./CheckboxList";
import Spinner from "./Spinner";
import Table from "./Table";

const ItemList = () => {
  const { items, isLoading } = useSelector((state) => state?.item);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [getAllItems]);

  const handleTodoStatusUpdate = (id) => {
    dispatch(updateStatus(id));
  };

  const total =
    items &&
    items?.reduce(
      (total, currentItem) => (total = total + currentItem.price),
      0
    );

  let spent = 0;
  let left = 0;

  items &&
    items?.map((item) => {
      if (item.status === false) {
        return (left += 1);
      }
    });

  items &&
    items.map((item) => {
      if (item.status) {
        return (spent += item.price);
      }
    });

  function Progress({ current = 0, total = 100 }) {
    return (
      <div className="mt-5 flex flex-row space-x-6 sm:ml-0 sm:p-0 sm">
        <h1>Progress bar</h1>
        <progress id="file" value={current} max={total} className="mt-1">
          {current}
        </progress>{" "}
        <span className="mr-2">
          {spent} birr spend out of {total} birr
        </span>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="main">
        <div className="transition-opacity duration-200 sm:px-6 lg:px-8">
          <div className="px-4 py-6 space-y-2 sm:px-0">
            {items.length === 0 ? (
              <p className="text-base text-gray-500 ml-5 p-4">No Item here!</p>
            ) : (
              <Table>
                {items?.map((item) => (
                  <CheckboxList
                    key={item._id}
                    item={item}
                    onCheckboxChange={handleTodoStatusUpdate}
                  />
                ))}
              </Table>
            )}

            <footer className="mx-10 flex flex-row justify-between">
              <div className="">
                {items.length > 0 && (
                  <>
                    <strong>{left}</strong> items incomplete.
                  </>
                )}
              </div>
              <div className="">
                {items.length > 0 && (
                  <>
                    Total of <strong>{items?.length}</strong> items.
                  </>
                )}
              </div>
            </footer>
            <div className="ml-10 mt-5 p-6 gap-3">
              <h1 className="text-2xl font-bold py-4 underline -ml-3 p-2">
                Analytics
              </h1>
              <h1 className="my-2">
                Total Amount:{"\t"}
                <span className="text-white bg-gray-500 p-1 rounded ml-2">
                  {total} birr
                </span>
                {"\t"}
              </h1>
              <h1>
                Total Spent:{"\t"}
                <span className="text-white bg-green-700 p-1 rounded ml-2">
                  {spent} birr
                </span>
              </h1>
              <Progress current={spent} total={total} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemList;
