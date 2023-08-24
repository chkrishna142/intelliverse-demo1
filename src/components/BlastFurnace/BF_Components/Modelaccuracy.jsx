
import React from "react";

function Modelaccuracy() {
  const componentStyle = {
    // position: 'fixed',

    // bottom: "20px", // Adjust the bottom distance as needed
    // right: "20px", // Adjust the right distance as needed
    width: "100%",
    height: "100%",

    padding: "0px",

    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "flex-end",
    gap: "10px",

    padding: "0px",

    // background: "#EDEFF5",
  };
  return (
    <div className="mt-[20px] mb-[30px] ">
    <div style={componentStyle} class="bg-transparent ">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* model acccuracte text */}
        <p
          style={{
            color: "var(--neutral-n-60, #938F96)",
           
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          Model Accuracy
        </p>

        {/* red green buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* smalll rectangles */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            {/* 1st rec */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="14"
              viewdiv="0 0 32 14"
              fill="none"
            >
              <rect width="32" height="14" rx="7" fill="#DC362E" />
            </svg>
            {/* 2nd rec */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="14"
              viewdiv="0 0 32 14"
              fill="none"
            >
              <rect width="32" height="14" rx="7" fill="#DC362E" />
            </svg>

            {/* 3 rec */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="14"
              viewdiv="0 0 32 14"
              fill="none"
            >
              <rect width="32" height="14" rx="7" fill="#F77F00" />
            </svg>

            {/* 4th rec */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="14"
              viewdiv="0 0 32 14"
              fill="none"
            >
              <rect width="32" height="14" rx="7" fill="#F77F00" />
            </svg>
            {/* 5th rec */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="14"
              viewdiv="0 0 32 14"
              fill="none"
            >
              <rect width="32" height="14" rx="7" fill="#69B04B" />
            </svg>
            {/* 6th rec */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="15"
              viewdiv="0 0 32 15"
              fill="none"
            >
              <rect y="0.5" width="32" height="14" rx="7" fill="#CAC5CD" />
            </svg>
          </div>
          {/* big rectangle */}
          <div
            style={{
              display: "flex",
              padding: "4px 8px",
              alignItems: "center",
              gap: "10px",
              borderRadius: "8px",
              background: "#69B04B",
            }}
          >
            <p
              style={{
                color: "var(--neutral-n-99, #FAFAFA)",
              
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              HIGH
            </p>
          </div>
          {/* retrain */}
          <div
        style={{
          display: "inline-flex",
          height: "40px",
          padding: "10px 16px",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          borderRadius: "100px",
          background: "var(--primaryp-10, #084298)",
        }}
      >
        <p
          style={{
            color: "var(--m-3-sys-light-on-primary, #FFF)",
            textAlign: "center",
           
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "20px",
            letterSpacing: "0.25px",
            display: "flex",
            justifyItems: "space-between",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewdiv="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 8L15 12H18C18 15.31 15.31 18 12 18C10.99 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C16.42 20 20 16.42 20 12H23L19 8ZM6 12C6 8.69 8.69 6 12 6C13.01 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C7.58 4 4 7.58 4 12H1L5 16L9 12H6Z"
              fill="white"
            />
          </svg>
          Retrain model
        </p>
      </div>
        </div>
       
      </div>
      {/* retail model */}
     
    </div>
    </div>
  );
}

export default Modelaccuracy;
