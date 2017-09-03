import React from "react";
import PropTypes from "prop-types";

import language from "../../../language.json";
import IconArrowRight from "../../utilities/icon-svg/icon.arrow.right";
import IconArrowLeft from "../../utilities/icon-svg/icon.arrow.left";

import style from "./control.css";

const Control = ({
  goPrevRoom,
  canGoPrevRoom,
  canGoNextRoom,
  goNextRoom,
  goPrevImage,
  goNextImage,
  currentRoom,
  currentImage,
  nbRoomx,
  nbImage
}) => {
  return (
    <div className={style.control}>
      <div className={style["btn-prev-room"]}>
        <button
          className="BtnSix"
          onClick={goPrevRoom}
          disabled={!canGoPrevRoom}
        >
          <IconArrowLeft />&nbsp;{language.btnSallePrev}
        </button>
      </div>
      <div className={style["info-panel"]}>
        <div className={style["btn-prev-image"]} onClick={goPrevImage}>
          <div className={style["foot-left"]} />
        </div>
        <p className="white">
          {language.gallery.salle}&nbsp;{currentRoom + 1}/{nbRoomx}
          <br />
          {currentImage}/ {nbImage}
        </p>
        <div className={style["btn-next-image"]} onClick={goNextImage}>
          <div className={style["foot-right"]} />
        </div>
      </div>

      <div className={style["btn-next-room"]}>
        <button
          className="BtnSix"
          onClick={goNextRoom}
          disabled={!canGoNextRoom}
        >
          {language.btnSalleNext}&nbsp;<IconArrowRight />
        </button>
      </div>
    </div>
  );
};

Control.propTypes = {
  canGoPrevRoom: PropTypes.bool.isRequired,
  canGoNextRoom: PropTypes.bool.isRequired,
  goPrevRoom: PropTypes.func.isRequired,
  goNextRoom: PropTypes.func.isRequired,
  goPrevImage: PropTypes.func.isRequired,
  goNextImage: PropTypes.func.isRequired,
  currentRoom: PropTypes.number.isRequired,
  currentImage: PropTypes.number.isRequired,
  nbRoomx: PropTypes.number.isRequired,
  nbImage: PropTypes.number.isRequired
};

export default Control;
