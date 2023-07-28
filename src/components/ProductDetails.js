import React from "react";
import Table from "react-bootstrap/Table";

export default function ProductDetails() {
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Product Details</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            <>
              <div className="items_img">
                <img
                  src="https://m.media-amazon.com/images/I/61j99uUfXNL._SX679_.jpg"
                  alt=""
                />
              </div>

              <div className="details">
                <Table>
                  <tr>
                    <td>
                      <p>
                        <strong>Name</strong> : Test Prod
                      </p>
                      <p>
                        <strong>Price</strong> : ₹ 200
                      </p>
                      <div
                        className="mt-5 d-flex justify-content-between align-items-center prd-add-remove">
                        <span className="prd-dec">-</span>
                        <span className="prd-qnty">{1}</span>
                        <span className="prd-inc">+</span>
                      </div>
                    </td>
                    <td>
                      <p>
                        <strong>Order Review :</strong>
                        <span>Test Order Review</span>
                      </p>
                    </td>
                  </tr>
                </Table>
              </div>
            </>
          </div>
        </section>
      </div>
    </>
  );
}
