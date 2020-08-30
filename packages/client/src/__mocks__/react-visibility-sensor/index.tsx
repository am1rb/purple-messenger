import React from "react";

interface ReactVisibilitySensorProps {
  onChange: (visible: boolean) => void;
}

const reactVisibilitySensor = jest.fn(({ onChange }) => (
  <div data-testid="mock-react-visibility-sensor">
    <button
      data-testid="mock-react-visibility-sensor-visible"
      onClick={() => onChange(true)}
    />
    <button
      data-testid="mock-react-visibility-sensor-invisible"
      onClick={() => onChange(false)}
    />
  </div>
));

export default reactVisibilitySensor;
