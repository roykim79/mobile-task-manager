module.exports = task => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h2>Title</h2>
          <p>${task.title}</p>
          <h2>Description</h2>
          <p>${task.description}</p>
        </div>
      </body>
    </html>
  `;
};