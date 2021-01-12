import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useCheckboxGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MEDIA_TYPES } from "../../config/contants";
import { useMDDispatch, useMDState } from "../../config/store";
import type {
  FuegoUserPref,
  FuegoValidatedUser,
  MediaTypes,
  UserPref,
} from "../../config/types";
import { fuegoSetPreferences } from "../../interfaces/fuegoMDActions";

function UserPreference({
  user,
  preference,
  cb,
}: {
  user: FuegoValidatedUser;
  preference?: FuegoUserPref;
  cb?: () => void;
}): JSX.Element {
  const hasPreference =
    typeof preference !== "undefined" && preference !== null && preference;
  const { setValue, value } = useCheckboxGroup({
    defaultValue: hasPreference ? hasPreference["mediaType"] : MEDIA_TYPES,
  });
  const [theme, setTheme] = useState<UserPref["theme"]>(
    hasPreference ? hasPreference["theme"] : "light"
  );
  const [error, setError] = useState<false | string>(false);
  const dispatch = useMDDispatch();
  const { isSaving } = useMDState();

  useEffect(() => {
    if (error && value.length >= 1) {
      setError(false);
    }
  }, [value, error]);

  return (
    <>
      {error && <Text>{error}</Text>}
      <Box mb={8}>
        <Text fontWeight="semibold" mb={2}>
          I&apos;d like to track the following:
        </Text>
        <CheckboxGroup onChange={(val) => setValue(val)} defaultValue={value}>
          <HStack spacing={10}>
            {MEDIA_TYPES.map((e) => (
              <Checkbox key={`mediaType_${e}`} value={e}>
                {e}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      </Box>
      <Box mb={8}>
        <Text mb={2} fontWeight="semibold">
          I want my theme to be:
        </Text>
        <RadioGroup
          onChange={(val) => setTheme(val as UserPref["theme"])}
          value={theme}
        >
          <HStack spacing={10}>
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
          </HStack>
        </RadioGroup>
      </Box>
      <Button onClick={setPreference} isLoading={isSaving} colorScheme="blue">
        Save
      </Button>
    </>
  );

  async function setPreference() {
    if (value.length >= 1) {
      try {
        dispatch({ type: "saving" });
        const preference = {
          mediaType: (value as unknown) as MediaTypes[],
          theme,
        };
        await fuegoSetPreferences(user.uid, preference);
        if (cb) {
          cb();
        }
        dispatch({
          type: "savedPreference",
          payload: preference,
        });
      } catch (e) {
        throw `[UserNew]: Failed to setPreference ${e}`;
      }
    } else {
      setError("Select at least 1 mediaType");
    }
  }
}

export default UserPreference;
