"use client";

import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

type StarRatingProps = {
  setStarRating: (rating: number) => void;
  postRating?: number;
};

export const StarRating = ({ setStarRating, postRating }: StarRatingProps) => {
  const [rating, setRating] = useState(postRating || 0);
  const [hover, setHover] = useState(0);

  useEffect(() => setStarRating(rating), [rating, setStarRating]);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
            }}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>
              <StarIcon
                className={
                  index <= (hover || rating)
                    ? "text-primary-500 fill-primary-500"
                    : "text-primary-500"
                }
              />
            </span>
          </button>
        );
      })}
      <p className="text-neutral-400 max-lg:hidden">
        Clique duplo na estrela zera
      </p>
      <button
        type="button"
        onClick={() => {
          setRating(0);
          setHover(0);
        }}
        className="text-neutral-400 block lg:hidden"
      >
        Zerar Estrelas
      </button>
    </div>
  );
};

type StarPost = {
  getRating: number;
};

export const StarPost = ({ getRating }: StarPost) => {
  const [rating, setRating] = useState(0);
  const hover = 0;

  useEffect(() => setRating(getRating), [getRating]);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div key={index}>
            <span>
              <StarIcon
                className={
                  index <= (hover || rating)
                    ? "text-primary-500 fill-primary-500"
                    : "text-primary-500"
                }
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};
