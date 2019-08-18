import Vue from "vue";
import moment from "moment";

Vue.filter("fullName", profile => {
  if (!profile) return "";
  return `${profile.firstName} ${profile.lastName}`;
});
Vue.filter("getYear", date => {
  if (!date) return "";
  const year = parseInt(moment(date).format("YYYY"));
  return year === new Date().getFullYear() ? "Now" : year;
});
Vue.filter("formatShortDate", day => {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format("MMM Do YYYY");
  }
  return moment(day).format("MMM Do YYYY");
});

Vue.filter("formatFullDateWithWeekDay", day => {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format("dddd, MMM DD, YYYY");
  }
  return moment(day).format("dddd, MMM DD, YYYY");
});

Vue.filter("formatMMMDD", day => {
  if (typeof day === "string") {
    return moment(day).format("MMM DD");
  }
  return moment(day).format("MMM DD");
});

Vue.filter("formatDMY", day => {
  if (typeof day === "string") {
    return moment(day).format("DD MMM, YYYY");
  }
  return moment(day).format("DD MMM, YYYY");
});

Vue.filter("formatMY", day => {
  if (typeof day === "string") {
    return moment(day).format("MMMM YYYY");
  }
  return moment(day).format("MMMMM YYYY");
});

Vue.filter("formatMMDDYYYY", day => {
  if (typeof day === "string") {
    return moment(day).format("MM/DD/YYYY");
  }
  return moment(day).format("MM/DD/YYYY");
});

Vue.filter("formatTime", day => {
  if (typeof day === "string") {
    return moment(day).format("HH:mm:ss");
  }
  return moment(day).format("HH:mm:ss");
});

Vue.filter("formatTimeHHmm", day => {
  if (typeof day === "string") {
    return moment(day).format("HH:mm");
  }
  return moment(day).format("HH:mm");
});

Vue.filter("formatTimeHHmmAMPM", day => {
  if (typeof day === "string") {
    return moment(day).format("HH:mm A");
  }
  return moment(day).format("HH:mm A");
});

Vue.filter("formatFullDateTime", day => {
  if (typeof day === "string") {
    return moment(day).format("lll");
  }
  return moment(day).format("lll");
});

Vue.filter("richTextToHtml", richText => {
  if (!richText) return richText;
  richText = richText.replace(/ /g, "&nbsp;");
  return richText.replace(/\n/g, "<br/>");
});
Vue.filter("fromSecondsToDays", duration => {
  return duration ? duration / 86400 : "";
});
