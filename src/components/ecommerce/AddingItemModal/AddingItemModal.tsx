import Lottie from 'lottie-react';
import animation from '../../../../public/done 2.json'
import { TProducts } from "@customtypes/TProducts.types";
import { Modal } from "flowbite-react";
import { useAppSelector } from "src/store/hooks";
import { RatingComponent } from "../Rating/RatingComponent";
import { Link } from "react-router";


export function AddingItemModal({ status, onClose, id }: { status: boolean, onClose: () => void, id: number }) {



  const { productData, error } = useAppSelector(state => state.products)

  const getProductSummary = productData.find((item: TProducts) => item.id == id)




  if (error || !getProductSummary) {
    return (
      <Modal show={status} onClose={onClose}>
        <Modal.Header>Error</Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <p className="text-red-500">
              {error || "Product not found"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            aria-label='close'
            onClick={onClose}
            className="bg-blue-400 hover:bg-blue-300 py-2 px-4 rounded-md text-white"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  const { title, image, brand, price, category } = getProductSummary;



  return (
    <>
      <Modal show={status} onClose={onClose}>
        <Modal.Header >
          <div className='flex items-center '>
            <Lottie animationData={animation} loop={false} style={{ width: "35px" }} />
            <span className='ml-3'>We Added this Product to your Cart</span>
          </div>
        </Modal.Header>
        <Modal.Body>

          <Link to={`/categories/${category}/${id}`}>
            <div className="flex flex-col justify-between sm:flex-row md:items-center">
              <div className="md:w-[400px] min-w-[300px] px-6 ">
                <img
                  src={image}
                  alt={title}
                  className="w-[170px] duration-500 group-hover:scale-105 object-contain h-[160px] transition"
                />

              </div>
              <div className="flex flex-col bg-white border-gray-100 border-t justify-between  items-start" >
                <div className="flex flex-col h-[140px] justify-between items-start mb-3">
                  <h3 className="text-gray-900 text-lg font-medium mt-1.5 overflow-hidden" >{title}</h3>
                  <span className="text-2xl text-orange-700 capitalize font-bold">{brand}</span>
                  <RatingComponent />
                  <div className="price">
                    <span className="text-2xl text-blue-600 font-bold pr-3">${price.toFixed(2)}  </span>

                  </div>
                </div>
              </div>
            </div>

          </Link>


        </Modal.Body>
        <Modal.Footer  >
          <Link to="/">
            <button
              aria-label='Countinue Shopping'
              onClick={onClose} className="bg-blue-400 hover:bg-blue-300 py-2 px-4 rounded-md text-white transition-all duration-[200]" >Countinue Shopping</button>
          </Link>
          <Link to="/cart">
            <button
              aria-label='Go to to your Cart'
              color="gray" onClick={onClose} className="text-blue-400 border-blue-300 hover:border-blue-400 border-2 py-2 px-4 rounded-md  transition-all duration-[200]">
              Go to to your Cart

            </button>
          </Link>
        </Modal.Footer>
      </Modal >
    </>
  );
}
