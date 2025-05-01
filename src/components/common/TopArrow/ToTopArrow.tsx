import { useEffect, useState } from "react";

const ToTopArrow = () => {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisibility(window.scrollY >= 600);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const clickButton = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        });
    };

    ;

    const arrowStyle = {

        display: visibility ? "block" : "none",

    };

    return (
        <button className='Arrow text-blue-400 fixed scale-[2] md:right-[50px] right-[20px] bottom-[140px] cursor-pointer ' onClick={clickButton} style={arrowStyle} aria-label="Scroll to Top button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up-circle-fill"
                viewBox="0 0 16 16"
            >
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
            </svg>
        </button>
    );
};

export default ToTopArrow;