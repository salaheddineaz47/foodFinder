function Error() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Dish Not Found</h2>
      <p className="text-red-600 font-semibold">
        <p>Sorry, we couldn't find the dish you're looking for.</p>
        <p>Please try searching for another recipe or check your input.</p>
      </p>
    </div>
  );
}

export default Error;
