import formatDate from "./formatDate.js";

const formatMessage = ({ firstName, lastName }, events, nextDate) => {
  let html = `<h3>Greetings, Professor ${firstName} ${lastName},</h3>`;
  html += `<h4><p><span style="color: red">Deadline</span> for tommorrow\'s (${formatDate(
    nextDate
  )}) project\'s tasks are: </p></h4>`;

  html += "<ol>";
  events.forEach((event) => {
    if (event.meetings.length !== 0) {
      html += "<li>";
      html += `Project Title: ${event.title}`;

      html += "<ul>";
      event.meetings.forEach((meeting) => {
        html += "<li>";
        html += `<p>Task Name: ${meeting.name}</p>`;
        html += `<p>Task Description: ${meeting.description}</p>`;
        html += "</li>";
      });
      html += "</ul>";
      html += "</li>";
    }
  });
  html += "</ol>";

  return html;
};

export default formatMessage;
