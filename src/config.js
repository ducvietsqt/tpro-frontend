export const colorsListForAvatars = [
  "primary",
  "secondary",
  "accent",
  "error",
  "warning",
  "info",
  "success",
  "grey",
  "deep-arange",
  "amber",
  "arange",
  "yellow",
  "brown",
  "lime",
  "green",
  "teal",
  "light-blue",
  "light-green",
  "cyan",
  "indigo",
  "deep-purple",
  "pink",
  "purple",
  "blue"
];

export const types = [
  { name: "Client", color: "primary" },
  { name: "Expert Witnesss", color: "error" },
  { name: "Fact Witness", color: "success" },
  { name: "Eye Witness", color: "purple" },
  { name: "Character Witness", color: "secondary" },
  { name: "Prosecution Witness", color: "black" },
  { name: "Defense Witness", color: "accent darken-2" },
  { name: "Chance Witness", color: "yellow darken-4" },
  { name: "Judge", color: "blue" },
  { name: "Defending Counsel", color: "grey" },
  { name: "Opposing Counsel", color: "blue darken-2" },
  { name: "Plaintiff", color: "pink" },
  { name: "Defendant", color: "green" },
  { name: "Jury", color: "info" }
];
export const showRolesContact = [
  { name: "Project lead", color: "green darken-2" },
  { name: "Team member", color: "amber darken-2" },
  { name: "Contact person", color: "purple accent-3" },
  { name: "( no role )", color: "default" }
];
export const spreadsheetConfig = {
  showToolbar: true,
  showGrid: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth
  },
  row: {
    len: 100,
    height: 25
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60
  },
  style: {
    bgcolor: "#ffffff",
    align: "left",
    valign: "middle",
    textwrap: false,
    strike: false,
    underline: false,
    color: "#0a0a0a",
    font: {
      name: "Helvetica",
      size: 10,
      bold: false,
      italic: false
    }
  }
};

export const roles = [
  { name: "Administrator", color: "red" },
  { name: "Sale", color: "primary" },
  { name: "Reception", color: "success" }
];
export const vulnerabilities = [
  {
    id: 1,
    name: "Very Low"
  },
  {
    id: 2,
    name: "Low"
  },
  {
    id: 3,
    name: "Medium"
  },
  {
    id: 4,
    name: "High"
  },
  {
    id: 5,
    name: "Critical"
  }
];
export const treatments = [
  {
    id: 1,
    name: "Overruled"
  },
  {
    id: 2,
    name: "Questioned"
  },
  {
    id: 3,
    name: "Cautioned"
  },
  {
    id: 4,
    name: "Distinguished"
  },
  {
    id: 5,
    name: "Explained"
  },
  {
    id: 6,
    name: "Followed"
  }
];

export const favorables = [
  {
    id: 1,
    name: "Plaintiff"
  },
  {
    id: 2,
    name: "Defendant"
  },
  {
    id: 3,
    name: "No-party"
  }
];
export const locations = ["	New York", "Los Angeles", "Chicago"];
export const risks = [
  {
    id: 1,
    name: "Very Low"
  },
  {
    id: 2,
    name: "Low"
  },
  {
    id: 3,
    name: "Medium"
  },
  {
    id: 4,
    name: "High"
  },
  {
    id: 5,
    name: "Critical"
  }
];

export const roleContacts = [
  {
    id: 1,
    name: "Project Lead"
  },
  {
    id: 2,
    name: "Team Member"
  },
  {
    id: 3,
    name: "Contact Person"
  },
];

export const allProjectBoardFilters = [
  { title: "Card name", name: "cardName" },
  { title: "Labels", name: "labels" },
  { title: "Due date", name: "dueDate" },
  { title: "Members", name: "members" },
  { title: "Progress", name: "progress" },
  { title: "Check List", name: "checkList" },
  { title: "Citations", name: "citations" },
  { title: "Tagging", name: "tagging" },
  { title: "Location", name: "location" },
  { title: "People", name: "people" },
  { title: "Work logs", name: "timeEntries" },
  { title: "Favorable", name: "favorable" },
  { title: "Risk", name: "risk" },
  { title: "Vulnerability", name: "vulnerability" },
  { title: "Treatment", name: "treatment" },
  { title: "Attachment", name: "attachment" },
  { title: "Notes", name: "notes" },
  { title: "Comments", name: "comments" },
  { title: "Card activities", name: "cardActivities" },
  { title: "Sub tasks", name: "subTasks" },
  { title: "Estimation", name: "estimation" }
];

export const resourceViewerColors = [
  "#1565C0",
  "#EF5350",
  "#D81B60",
  "#00897B",
  "#689F38",
  "#43A047",
  "#6A1B9A"
];
