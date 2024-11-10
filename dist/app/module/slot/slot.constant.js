"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSearchQuery = exports.convertToTimeString = exports.convertToMinutes = void 0;
const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
exports.convertToMinutes = convertToMinutes;
const convertToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${mins}`;
};
exports.convertToTimeString = convertToTimeString;
const filterSearchQuery = (query, searchQuery) => {
    if (!query || !(query === null || query === void 0 ? void 0 : query.date) || !(query === null || query === void 0 ? void 0 : query.roomId)) {
        if (!query) {
            delete searchQuery.date;
            delete searchQuery.room;
        }
        if (!query.date) {
            delete searchQuery.date;
        }
        if (!query.roomId) {
            delete searchQuery.room;
        }
    }
    return searchQuery;
};
exports.filterSearchQuery = filterSearchQuery;
