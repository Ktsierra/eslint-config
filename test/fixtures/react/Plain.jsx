export function List({ items }) {
  return (
    <ul ref="list">
      {items.map((item) => (
        <li title={ item }>{item}</li>
      ))}
    </ul>
  );
}
