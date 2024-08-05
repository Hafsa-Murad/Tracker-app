"use client";

export default function DisplayProduct({ stockData, handleRemoveProduct }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Display Current Stock</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b bg-gray-100">ID</th>
            <th className="py-3 px-4 border-b bg-gray-100">Product Name</th>
            <th className="py-3 px-4 border-b bg-gray-100">Quantity</th>
            <th className="py-3 px-4 border-b bg-gray-100">Price</th>
            <th className="py-3 px-4 border-b bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="py-3 px-4 border-b">{item.id}</td>
              <td className="py-3 px-4 border-b">{item.name}</td>
              <td className="py-3 px-4 border-b">{item.quantity}</td>
              <td className="py-3 px-4 border-b">{item.price}</td>
              <td className="py-3 px-4 border-b">
                <button onClick={() => handleRemoveProduct(item.id)} className="bg-red-500 text-white p-2 rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
