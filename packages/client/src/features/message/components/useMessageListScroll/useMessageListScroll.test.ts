import { renderHook } from "@testing-library/react-hooks";
import useMessageListScroll from "./useMessageListScroll";
import { mustScrollToTheEnd } from "features/message/helpers";

jest.mock("features/message/helpers");

describe("The useMessageListScroll tests", () => {
  it("Should call scrollIntoView if the mustScrollToTheEnd hook returns true", () => {
    (mustScrollToTheEnd as jest.Mock).mockReturnValue(true);
    const { rerender, result } = renderHook(
      (props) => useMessageListScroll(props.messages),
      { initialProps: { messages: [] } }
    );

    const mockScrollIntoView = jest.fn();
    const mockTestDiv = ({
      scrollIntoView: mockScrollIntoView,
    } as Partial<HTMLDivElement>) as HTMLDivElement;

    (result.current.lastMessageRef as React.MutableRefObject<
      HTMLDivElement
    >).current = mockTestDiv;
    (result.current.messageListRef as React.MutableRefObject<
      HTMLDivElement
    >).current = mockTestDiv;

    rerender({ messages: [] });

    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  it("Should call scrollIntoView if the mustScrollToTheEnd hook returns false", () => {
    (mustScrollToTheEnd as jest.Mock).mockReturnValue(false);
    const { rerender, result } = renderHook(
      (props) => useMessageListScroll(props.messages),
      { initialProps: { messages: [] } }
    );

    const mockScrollIntoView = jest.fn();
    const mockTestDiv = ({
      scrollIntoView: mockScrollIntoView,
    } as Partial<HTMLDivElement>) as HTMLDivElement;

    (result.current.lastMessageRef as React.MutableRefObject<
      HTMLDivElement
    >).current = mockTestDiv;
    (result.current.messageListRef as React.MutableRefObject<
      HTMLDivElement
    >).current = mockTestDiv;

    rerender({ messages: [] });

    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });
});
