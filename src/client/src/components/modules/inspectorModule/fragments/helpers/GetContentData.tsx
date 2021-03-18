// Placeholder for hard-coded data until further notice..

const GetContentData = (index: number) => {
  const objectData = {
    content: [
      {
        type: "ID",
        value: "",
      },
      {
        type: "Test",
        value: "",
      },
      {
        type: "Info",
        value: "",
      },
    ],
  };
  const headerData = {
    content: [
      {
        type: "ID",
        value: "",
      },
      {
        type: "Semantic ID",
        value: "",
      },
      {
        type: "Tag number",
        value: "",
      },
      {
        type: "Reference Designation",
        value: "",
      },
      {
        type: "Service Description",
        value: "",
      },
      {
        type: "Change mode",
        value: "",
      },
      {
        type: "Version",
        value: "",
      },
      // {
      //   type: "Kind",
      //   value: "",
      // },
      // {
      //   type: "Status",
      //   value: "",
      // },
      // {
      //   type: "Project",
      //   value: "",
      // },
      // {
      //   type: "Long Description",
      //   value: "",
      // },
      // {
      //   type: "Long Local Decription",
      //   value: "",
      // },
      // {
      //   type: "Updated by",
      //   value: "",
      // },
      // {
      //   type: "Contractor",
      //   value: "",
      // },
    ],
  };

  const bodyData = {
    content: [
      {
        type: "Saturation Pressure",
        value: "",
      },
      {
        type: "Saturation Temperature",
        value: "",
      },
      {
        type: "Maximum gas processing capacity",
        value: "",
      },
      {
        type: "Maximum oil processing capacity",
        value: "",
      },
      {
        type: "Maximum produced water capacity",
        value: "",
      },
      {
        type: "Total liquid capacity",
        value: "",
      },
      {
        type: "Total injection water rate",
        value: "",
      },
    ],
  };

  const relationsData = {
    content: [
      {
        type: "Relation name",
        value: "",
      },
      {
        type: "Connected to",
        value: "",
      },
      {
        type: "Relation to",
        value: "",
      },
      {
        type: "Part of",
        value: "",
      },
      {
        type: "Has function",
        value: "",
      },
      {
        type: "Fulfilled by",
        value: "",
      },
    ],
  };

  const inheretedData = {
    content: [
      {
        type: "Header + Body",
        value: "",
      },
      {
        type: "Requirments from parents",
        value: "",
      },
    ],
  };

  const contentData = [];
  contentData.push(
    objectData,
    headerData,
    bodyData,
    relationsData,
    inheretedData
  );
  return contentData[index];
};

export default GetContentData;
