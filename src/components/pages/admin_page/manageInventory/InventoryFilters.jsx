import "./inventoryFilters.css";

export default function InventoryFilters({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus
}) {

    return (

        <div className="admin-manage-inventory-inventory-filters">

            <div className="admin-manage-inventory-search-box">

                <input

                    type="text"

                    placeholder="Search inventory..."

                    value={search}

                    onChange={(event) =>
                        setSearch(event.target.value)
                    }

                />

            </div>

            <div className="admin-manage-inventory-filter-box">

                <select

                    value={category}

                    onChange={(event) =>
                        setCategory(event.target.value)
                    }

                >

                    <option value="All">

                        All Categories

                    </option>

                    <option value="BASE">

                        Base

                    </option>

                    <option value="SAUCE">

                        Sauce

                    </option>

                    <option value="CHEESE">

                        Cheese

                    </option>

                    <option value="VEGETABLE">

                        Vegetable

                    </option>

                </select>

            </div>

            <div className="admin-manage-inventory-filter-box">

                <select

                    value={status}

                    onChange={(event) =>
                        setStatus(event.target.value)
                    }

                >

                    <option value="All">

                        All Status

                    </option>

                    <option value="Available">

                        Available

                    </option>

                    <option value="Low Stock">

                        Low Stock

                    </option>

                    <option value="Out Of Stock">

                        Out Of Stock

                    </option>

                </select>

            </div>

        </div>

    );

}