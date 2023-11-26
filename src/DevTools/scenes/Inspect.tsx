import React from "react";
import { Col } from "react-bootstrap";
import Scene from "../components/atoms/Scene";
import StateViewer from "../components/organisms/StateViewer";
import { storeData } from "../testData";

interface Props {}

export default function Inspect({}: Props) {
  return (
    <>
      <Scene>
        <Col sm={"4"} className={"p-3"}>
          <p className={""}>
            <i className="fa-solid fa-cubes text-success pe-2"></i>
            <span className={"text-white"}>{storeData[0].storeName}</span>
          </p>
          {storeData[0].stateGroup.map((item, index) => (
            <React.Fragment key={index}>
              <p>
                <i className="fa-solid fa-arrow-right-long text-success pe-2"></i>
                <i className="fa-solid fa-cube text-success pe-2"></i>
                <span className={"text-white"}>{item.key}</span>
              </p>
            </React.Fragment>
          ))}
          <p>
            <i className="fa-solid fa-arrow-right-long text-success pe-2"></i>
            <i className="fa-solid fa-plug text-success pe-2"></i>
            <span className={"text-white"}>Devtools</span>
          </p>
          <p>
            <i className="fa-solid fa-arrow-right-long text-success pe-2"></i>
            <i className="fa-solid fa-plug text-success pe-2"></i>
            <span className={"text-white"}>Slices</span>
          </p>
        </Col>
        <Col className={"p-0"}>
          <StateViewer storeName="Store 1" stateKey="fruit" />
        </Col>
      </Scene>
    </>
  );
}
