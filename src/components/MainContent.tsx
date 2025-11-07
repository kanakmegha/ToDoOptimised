interface Item {
  id: number;
  type: "task" | "tracker";
  name: string;
}

interface MainContentProps {
  items: Item[];
}

function MainContent({ items }: MainContentProps) {
  return (
    <div className="main-content">
      <h3>Your Items</h3>
      {items.length === 0 ? (
        <p className="empty">No items yet. Create one from the sidebar!</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className={item.type}>
              <span>{item.name}</span>
              <span className="tag">{item.type.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MainContent;
