import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../Context/FilterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helper/FormatPrice";
import {Button} from "../style/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, maxPrice, minPrice, price },
    filterUpdateValue,
    all_products,
    clearFilters
  } = useFilterContext();

  const uniqueData = (data, property) => {
    let propertyData = data.map((curElem, index) => {
      return curElem[property];
    });

    if (property === "colors") {
      propertyData = propertyData.flat();
    }

    return (propertyData = ["All", ...new Set(propertyData)]);
  };

  const categoryData = uniqueData(all_products, "category");
  const companyData = uniqueData(all_products, "company");
  const colorsData = uniqueData(all_products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Search"
            onChange={filterUpdateValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((currElem, index) => {
            return (
              <button
                type="button"
                name="category"
                key={index}
                value={currElem}
                onClick={filterUpdateValue}
                className={currElem === category ? "active" : ""}
              >
                {currElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={filterUpdateValue}
          >
            {companyData.map((currElem, index) => {
              return (
                <option key={index} name="company" value={currElem}>
                  {currElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorsData.map((currElem, index) => {
            if (currElem === "All") {
              return (
                <button
                  type="button"
                  name="color"
                  key={index}
                  value={currElem}
                  className="color-all--style"
                  onClick={filterUpdateValue}
                >
                  All
                </button>
              );
            }
            return (
              <button
                type="button"
                name="color"
                key={index}
                value={currElem}
                className={currElem === color ? "btnStyle active" : "btnStyle"}
                onClick={filterUpdateValue}
                style={{ backgroundColor: currElem }}
              >
                {color === currElem ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          max={maxPrice}
          min={minPrice}
          value={price}
          onChange={filterUpdateValue}
        />
      </div>

      <div className="filter-clear">
        <Button onClick={clearFilters}>Clear Filters</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
