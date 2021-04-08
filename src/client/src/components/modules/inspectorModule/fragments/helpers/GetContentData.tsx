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
      {
        type: "Updated Date",
        value: "",
        id: "16",
      },
    ],
  };

  const bodyData = {
    content: [
      {
        type: "Saturation Pressure",
        value: "",
        id: "17",
      },
      {
        type: "Saturation Temperature",
        value: "",
        id: "18",
      },
      {
        type: "Maximum gas processing capacity",
        value: "",
        id: "19",
      },
      {
        type: "Maximum oil processing capacity",
        value: "",
        id: "20",
      },
      {
        type: "Maximum produced water capacity",
        value: "",
        id: "21",
      },
      {
        type: "Total liquid capacity",
        value: "",
        id: "22",
      },
      {
        type: "Total injection water rate",
        value: "",
        id: "23",
      },
    ],
  };

  const relationsData = {
    content: [
      {
        type: "Relation name",
        value: "",
        id: "24",
      },
      {
        type: "Has function",
        value: "",
        id: "25",
      },
      {
        type: "Updated by",
        value: "",
        id: "26",
      },
      {
        type: "Connected to",
        value: "",
        id: "27",
      },
      {
        type: "Project",
        value: "",
        id: "28",
      },
      {
        type: "Updated Date",
        value: "",
        id: "29",
      },
      {
        type: "Relation out",
        value: "",
        id: "30",
      },
      {
        type: "Another field",
        value: "",
        id: "31",
      },
      {
        type: "Has location",
        value: "",
        id: "32",
      },
      {
        type: "Fulfilled by",
        value: "",
        id: "33",
      },
    ],
  };

  const inheretedData = {
    content: [
      {
        type: "Header + Body",
        value: "",
        id: "34",
      },
      {
        type: "Requirements from parents",
        value: "",
        id: "35",
      },
    ],
  };

  const commentsData = {
    content: [
      {
        type: "Comments",
        value: "",
        id: "36",
      },
    ],
  };

  const changelogData = {
    content: [
      {
        type: "Changelog",
        value: "",
        id: "37",
      },
    ],
  };

  const contentData = [];
  contentData.push(
    objectData,
    headerData,
    bodyData,
    relationsData,
    inheretedData,
    commentsData,
    changelogData
  );
  return contentData[index];
};

export default GetContentData;
