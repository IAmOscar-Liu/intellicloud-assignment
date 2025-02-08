import { waitFor } from "@/lib/utils";
import { ClassDetailInfo, ClassInfo } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ClassState {
  classlist: ClassInfo[];
  isLoading: boolean;
  cachedClasses: Record<string, ClassDetailInfo>;
}

const initialState: ClassState = {
  classlist: [],
  isLoading: false,
  cachedClasses: {},
};

export const getAllClasses = createAsyncThunk(
  "class/getAllClasses",
  async (_, thunkApi) => {
    const currentState = (thunkApi.getState() as RootState).class;
    if (currentState.classlist.length > 0) return currentState.classlist;
    try {
      await waitFor(1000);
      const response = await fetch("/classlist.json");
      const json = await response.json();
      if (json.code !== 200) throw new Error("Failed to get class list");
      return json.data as ClassInfo[];
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getClassById = createAsyncThunk(
  "class/getClassById",
  async (classId: string, thunkApi) => {
    const currentState = (thunkApi.getState() as RootState).class;
    if (currentState.cachedClasses[classId] !== undefined)
      return currentState.cachedClasses[classId]!;
    try {
      await waitFor(1000);
      const response = await fetch(`/classes/${classId}.json`);
      const json = await response.json();
      if (json.code !== 200) throw new Error("Failed to get class list");
      return json.data as ClassDetailInfo;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    incrementStudentPoint: (
      state,
      action: PayloadAction<{ classId: string; studentId: string }>,
    ) => {
      const students = state.cachedClasses[action.payload.classId]?.students;
      if (!students) return;
      const student = students.find((s) => s.id === action.payload.studentId);
      if (student) student.point++;
    },
    decrementStudentPoint: (
      state,
      action: PayloadAction<{ classId: string; studentId: string }>,
    ) => {
      const students = state.cachedClasses[action.payload.classId]?.students;
      if (!students) return;
      const student = students.find((s) => s.id === action.payload.studentId);
      if (student && student.point > 0) student.point--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classlist = action.payload;
      })
      .addCase(getAllClasses.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error);
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.cachedClasses[action.meta.arg] = action.payload;
      })
      .addCase(getClassById.rejected, (_, action) => {
        console.error(action.error);
      });
  },
});

export const { incrementStudentPoint, decrementStudentPoint } =
  classSlice.actions;

export default classSlice.reducer;
