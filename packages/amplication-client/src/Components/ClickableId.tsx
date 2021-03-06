import React, { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import { TruncatedId } from "./TruncatedId";
import { useTracking, Event as TrackEvent } from "../util/analytics";
import "./ClickableId.scss";

type Props = LinkProps & {
  label?: string;
  id: string;
  eventData?: TrackEvent;
};

export const ClickableId = ({
  to,
  id,
  label,
  eventData,
  onClick,
  ...rest
}: Props) => {
  const { trackEvent } = useTracking();

  const handleClick = useCallback(
    (event) => {
      if (eventData) {
        trackEvent(eventData);
      }
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, eventData, trackEvent]
  );

  return (
    <span className="clickable-id">
      {label}{" "}
      <Link {...rest} to={to} onClick={handleClick}>
        <TruncatedId id={id} />
      </Link>
    </span>
  );
};
