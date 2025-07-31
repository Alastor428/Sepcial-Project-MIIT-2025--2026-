import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        _input: {
          outlineWidth: 0, // ✅ fixes error globally
        },
        _focus: {
          outlineWidth: 0, // ✅ no error when focused
        },
      },
    },
  },
});
