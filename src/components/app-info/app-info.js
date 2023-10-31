import "./app-info.css";

const AppInfo = ({ counterAll, counterPrioritised }) => {
  return (
    <div className="app-info">
      <h1>Yours Todo List</h1>
      <h3>All things to do for today: {counterAll}</h3>
      <h3>Prioritised tasks: {counterPrioritised}</h3>
    </div>
  );
};

export default AppInfo;
