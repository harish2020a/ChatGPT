"use client";
import Select from "react-select";
import useSWR from "swr";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{ control: (state) => "text-red-500" }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#434654",
            background: "#434654",
          }),
        }}
        placeholder={model}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
