const useField = jest.fn(() => {
  return {
    fieldName: "fieldName",
    registerField: () => {},
    defaultValue: "defaultValue",
    error: "",
  };
});

export default useField;
