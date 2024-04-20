import { useContext, useRef, useCORS } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSquareYoutube } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import AuthContext from "../Context/AuthContext";
import "./CertificateContainer.css";


function CertificateContainer() {
  let authcontext = useContext(AuthContext);

  const dp = authcontext.dp=="" ? "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" : authcontext.dp;

  const CertificateRef = useRef(null);

  const getLinkedInName = (url) => {
    console.log("LinkedIn URL:", url);
    const parts = url.split("/");
    console.log("Parts:", parts);
    const name = parts[4];
    console.log("Extracted Name:", name);
    return name;
  };

  const handleDownload = async () => {
    if (!CertificateRef.current) return;

    try {
      // Capture the certificate as a canvas
      const canvas = await html2canvas(CertificateRef.current, {
        scale: 1.5, // Increase scale for better quality
        useCORS: true, // Use CORS if necessary
      });

      // Convert the canvas to a data URL (base64 encoded PNG)
      const dataURL = canvas.toDataURL("image/png");

      // Create a link element to download the image
      const link = document.createElement("a");
      link.href = dataURL; // Set the href to the data URL
      link.download = "proudmembercard.png"; // Set the filename for the download

      // Append the link to the document and trigger a click to start the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing or downloading certificate:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="col-md-8">
              <img
                style={{ width: "300px", height: "70px" }}
                src="https://wowhr.in/assets/site_assets/images/wow-hr-logo.png"
                className="m-4"
              />
            </div>
          </div>

          <div className="col-md-4 mt-4 ">
            <div className="rightcontainer ml-5">
              <button
                style={{ fontSize: "15px" }}
                type="button"
                className="btn btn-warning"
                onClick={handleDownload}
              >
                {" "}
                Download Card
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center  mt-4">
          <div className="leftcontainer col-md-12">
            <div className="certificate" id="certificate" ref={CertificateRef}>
              <img className="ribbon" src={"images/ribbon.png"} alt="ribbon" />
              <div class="links">
                <a href="https://wowhr.in/">www.wowhr.in</a>
                <div class="socialmedia">
                  <div class="icons">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      style={{ fontSize: "20px", color: "#1877f2" }}
                    />
                    <FontAwesomeIcon
                      icon={faSquareTwitter}
                      style={{ fontSize: "20px", color: "#6eadff" }}
                    />
                    <FontAwesomeIcon
                      icon={faSquareInstagram}
                      style={{ fontSize: "20px", color: "rgb(255, 0, 200)" }}
                    />
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      style={{ fontSize: "20px", color: "#1877f2" }}
                    />
                    <FontAwesomeIcon
                      icon={faSquareYoutube}
                      style={{ fontSize: "20px", color: "red" }}
                    />
                  </div>
                  <h5>wowhr</h5>
                </div>
              </div>
              <div class="namecontainer">
                <h1 style={{ fontWeight:"900",fontSize:"35px" }} class="name" id="name">
                  {authcontext.Name}
                </h1>
                <p style={{ fontSize: "20x",width:"400px" }} id="designation">
                  <b>
                    {authcontext.designation} , {authcontext.companyname}
                  </b>
                </p>
                {authcontext.Linkedin != "" && (
                  <div className="linkedincontent" style={{ display: "flex",alignItems:"center",height:"55px"}}>
                    {/* <FontAwesomeIcon
                      icon={faLinkedinIn}
                      style={{
                        fontSize: "25px",
                        color: "white",
                        background: "#1877f2",
                        padding: "7px 9px",
                        borderRadius: "50px",
                        width: "fit-content",

                      }}
                    /> */}
                    <img
                      class="linkedin-logo-small"
                      src="./images/linkedin1.png"
                      alt="LinkedIn Logo"
                     
                    />
                    <p
                      class="linkedin"
                      id="linkedin"
                    >
                      <b>{getLinkedInName(authcontext.Linkedin)}</b>
                    </p>
                  </div>
                )}
                {authcontext.Linkedin === "" && (
                  <div
                    style={{ display: "flex", gap: "10px", height: "50px" }}
                  ></div>
                )}
              </div>
              <div class="dpcontainer">
                <img src={dp} alt="" id="dp"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateContainer;