// Placeholder for hard-coded data until further notice..

const GetContentData = (index: number) => {
  const objectData = {
    content: [
      {
        type: "ID",
        value: "",
        id: "1",
      },
    ],
  };
  const headerData = {
    content: [
      {
        type: "ID",
        value: "",
        id: "2",
      },
      {
        type: "Semantic ID",
        value: "",
        id: "3",
      },
      {
        type: "Tag number",
        value: "",
        id: "4",
      },
      {
        type: "Reference Designation",
        value: "",
        id: "5",
      },
      {
        type: "Service Description",
        value: "",
        id: "6",
      },
      {
        type: "Change mode",
        value: "",
        id: "7",
      },
      {
        type: "Version",
        value: "",
        id: "8",
      },
      {
        type: "Kind",
        value: "",
        id: "9",
      },
      {
        type: "Status",
        value: "",
        id: "10",
      },
      {
        type: "Project",
        value: "",
        id: "11",
      },
      {
        type: "Long Description",
        value: "",
        id: "12",
      },
      {
        type: "Long Local Decription",
        value: "",
        id: "13",
      },
      {
        type: "Updated by",
        value: "",
        id: "14",
      },
      {
        type: "Contractor",
        value: "",
        id: "15",
      },
    ],
  };

  const bodyData = {
    content: [
      {
        type: "Saturation Pressure",
        value: "",
        id: "16",
      },
      {
        type: "Saturation Temperature",
        value: "",
        id: "17",
      },
      {
        type: "Maximum gas processing capacity",
        value: "",
        id: "18",
      },
      {
        type: "Maximum oil processing capacity",
        value: "",
        id: "19",
      },
      {
        type: "Maximum produced water capacity",
        value: "",
        id: "20",
      },
      {
        type: "Total liquid capacity",
        value: "",
        id: "21",
      },
      {
        type: "Total injection water rate",
        value: "",
        id: "22",
      },
    ],
  };

  const relationsData = {
    content: [
      {
        type: "Relation name",
        value: "",
        id: "23",
      },
      {
        type: "Connected to",
        value: "",
        id: "24",
      },
      {
        type: "Relation to",
        value: "",
        id: "25",
      },
      {
        type: "Part of",
        value: "",
        id: "26",
      },
      {
        type: "Has function",
        value: "",
        id: "27",
      },
      {
        type: "Fulfilled by",
        value: "",
        id: "28",
      },
    ],
  };

  const inheretedData = {
    content: [
      {
        type: "Header + Body",
        value: "",
        id: "29",
      },
      {
        type: "Requirements from parents",
        value: "",
        id: "30",
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
