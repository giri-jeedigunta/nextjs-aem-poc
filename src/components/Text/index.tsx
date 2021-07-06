import React from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
import DOMPurify from "dompurify";
import extractModelId from "../../utils/extract-model-id";

export const TextEditConfig = {
  emptyLabel: "Text",

  isEmpty: function (props?: any) {
    return !props || !props.src || props.src.trim().length < 1;
  },
};

export default function Text(props?: any) {
  return props.richText ? (
    <div
      id={extractModelId(props.cqPath)}
      data-rte-editelement
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }}
    />
  ) : (
    <div>{props.text}</div>
  );
}

MapTo("poc-spa-site/components/text")(Text, TextEditConfig);