import "../manageInventory/inventoryFilters.css";

export default function ManageFilterPizza({
    search,
    setSearch,
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

                    <option value="Out Of Stock">

                        Out Of Stock

                    </option>

                </select>

            </div>

        </div>

    );

}