/**
 * MEDIA SEARCH
 * ---
 * We have a simple way of searching throughout three types of media. Using the API keys from each
 * respecitve service we can then get that
 *
 * Resources
 * - https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
 */
import * as React from "react";
import { useState, useEffect, createRef } from "react";
import { Box, Flex, Text } from "./components";
import Input, { InputRef } from "./components/Input";
import styled from "styled-components";
import useDebounce from "./hooks/useDebounce";
import { MediaTypes } from "./config/types";
import { useStoreActions } from "./config/store";
import { MediaSelected } from "./config/storeMedia";
// import { addMedia, addMediaLog } from "./config/actions";

const MediaResults = styled(Box)`
  max-height: 32vh;
  overflow: scroll;
  & > li:hover {
    cursor: pointer;
    color: var(--orange);
    background-color: var(--bg-secondary);
  }
`;

interface MediaSearchList extends MediaTypes {
  item: any;
  children(props: { name: string; artist: string; date: Date }): JSX.Element;
}

const MediaSearchList = (props: MediaSearchList) => {
  const { type, item } = props;
  let name;
  let artist;
  let date;

  if (type === "film") {
    name = item.title;
    artist = false;
    date = item.release_date;
  } else if (type === "tv") {
    name = item.original_name;
    artist = false;
    date = item.first_air_date;
  } else if (type === "album") {
    name = item.name;
    artist = item.artist;
    date = item.release_date;
  }

  return props.children({
    name: name,
    artist: artist,
    date: date
  });
};

const MediaSearch = ({ type }: MediaTypes) => {
  const mediaSelect = useStoreActions(actions => actions.media.mediaSelect);
  const [searchInput, setSearchInput] = useState("");
  const [mediaResult, setMediaResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const bouncedSearch = useDebounce(searchInput, 500);
  const InputRef = createRef<InputRef>();

  useEffect(() => {
    if (bouncedSearch) {
      setIsSearching(true);
      handleFetch(type, encodeURIComponent(bouncedSearch))
        .then((r: Response) => r.json())
        .then((res: any) => {
          setIsSearching(false);
          setMediaResult(
            type !== "album" ? res.results : res.results.albummatches.album
          );
        });
    } else {
      setMediaResult([]);
    }
  }, [bouncedSearch, type]);

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  });

  return (
    <>
      <Box>
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Flex>
            <Text fontSize={4} fontWeight={600}>
              Media Search
            </Text>
            <Text as="span" fontSize={4} ml={2} fontWeight={300}>
              /
            </Text>
            <Text as="span" fontSize={4} ml={2} color="orange">
              {type}
            </Text>
          </Flex>
          <Text>Close</Text>
        </Flex>
        <Input
          ref={InputRef}
          onChange={e => setSearchInput(e.target.value)}
          placeholder={`Search ${type}`}
          type="search"
        />
      </Box>
      {isSearching && <Box pt={3}>Searching ...</Box>}
      {mediaResult.length > 0 && (
        <>
          <Box my={2} borderTop="1px solid #d1d5da" />
          <MediaResults
            as="ul"
            pt={2}
            pl={0}
            mb={0}
            style={{ listStyle: "none" }}
          >
            {mediaResult.map((e, i) => (
              <MediaSearchList key={type + i} type={type} item={e}>
                {({ name, artist, date }) => (
                  <Box
                    as="li"
                    py={2}
                    pl={2}
                    mt={0}
                    onClick={() => mediaSelect(mediaNormalize(e))}
                  >
                    {name && name}
                    {artist && ` - ${artist}`}
                    {date &&
                      ` (${new Date(date).toLocaleDateString("en-us", {
                        year: "numeric"
                      })})`}
                  </Box>
                )}
              </MediaSearchList>
            ))}
          </MediaResults>
        </>
      )}
    </>
  );

  // Will return promise with appropriate film information
  function handleFetch(searchType: MediaTypes["type"], search: string) {
    let URL = "";
    if (searchType === "film") {
      URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MDB}&language=en-US&query=${search}&page=1&include_adult=false`;
    } else if (searchType === "tv") {
      URL = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MDB}&language=en-US&query=${search}&page=1`;
    } else if (searchType === "album") {
      URL = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${process.env.REACT_APP_LASTFM}&limit=15&format=json`;
    }
    return fetch(URL);
  }

  function mediaNormalize(media: any) {
    let id, poster, title, published, overview, watched, artist, mbid;
    if (type === "film") {
      id = media.id.toString();
      poster = `https://image.tmdb.org/t/p/w400/${media.poster_path}`;
      title = media.title;
      published = media.release_date;
      overview = media.overview;
      artist = typeof media.director !== "undefined" && media.director;
      watched = "Watched";
      // styleText = {
      //   as: "strong",
      //   textTransform: "uppercase"
      // };
    } else if (type === "tv") {
      id = media.id.toString();
      poster = `https://image.tmdb.org/t/p/w400/${media.poster_path}`;
      title = media.name;
      published = media.first_air_date;
      overview = media.overview;
      artist = typeof media.creator !== "undefined" && media.creator;
      watched = "Watched";
      // styleText = {
      //   textTransform: "uppercase"
      // };
    } else if (type === "album") {
      debugger;
      mbid = media.mbid;
      id = encodeURIComponent(media.artist + media.name);
      poster = media.image[3]["#text"];
      title = media.name;
      artist = media.artist;
      overview =
        typeof media.wiki !== "undefined"
          ? media.wiki.summary.split("<a href")[0]
          : undefined;
      watched = "Listened To";
      published = "";
      // styleText = {
      //   fontStyle: "italic"
      // };
    }
    const mediaReturn: MediaSelected = {
      id,
      poster,
      title,
      published,
      overview,
      watched,
      artist,
      mbid
    };
    return mediaReturn;
  }
};

export default MediaSearch;
