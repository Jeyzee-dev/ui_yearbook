import { useState, useCallback } from 'react';
import { useAlumni } from '../contexts/AlumniContext';

export const useAlumniSearch = () => {
  const { alumniList } = useAlumni();
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    batchYear: '',
    program: '',
    department: '',
    section: '',
    employmentStatus: '',
    searchQuery: ''
  });

  const searchAlumni = useCallback((searchFilters = {}) => {
    const activeFilters = { ...filters, ...searchFilters };
    setFilters(activeFilters);

    let results = alumniList;

    // Apply filters
    if (activeFilters.batchYear) {
      results = results.filter(alum => alum.batchYear === activeFilters.batchYear);
    }
    if (activeFilters.program) {
      results = results.filter(alum => alum.program === activeFilters.program);
    }
    if (activeFilters.department) {
      results = results.filter(alum => alum.department === activeFilters.department);
    }
    if (activeFilters.section) {
      results = results.filter(alum => alum.section === activeFilters.section);
    }
    if (activeFilters.employmentStatus) {
      results = results.filter(alum => alum.employmentStatus === activeFilters.employmentStatus);
    }
    if (activeFilters.searchQuery) {
      const query = activeFilters.searchQuery.toLowerCase();
      results = results.filter(alum =>
        alum.fullName.toLowerCase().includes(query) ||
        alum.program.toLowerCase().includes(query) ||
        alum.department.toLowerCase().includes(query)
      );
    }

    setSearchResults(results);
    return results;
  }, [alumniList, filters]);

  const clearFilters = useCallback(() => {
    setFilters({
      batchYear: '',
      program: '',
      department: '',
      section: '',
      employmentStatus: '',
      searchQuery: ''
    });
    setSearchResults(alumniList);
  }, [alumniList]);

  return {
    searchResults,
    filters,
    searchAlumni,
    clearFilters,
    setFilters
  };
};

export const useAlumniStats = () => {
  const { alumniList } = useAlumni();

  const stats = {
    totalAlumni: alumniList.length,
    byBatchYear: alumniList.reduce((acc, alum) => {
      acc[alum.batchYear] = (acc[alum.batchYear] || 0) + 1;
      return acc;
    }, {}),
    byProgram: alumniList.reduce((acc, alum) => {
      acc[alum.program] = (acc[alum.program] || 0) + 1;
      return acc;
    }, {}),
    employed: alumniList.filter(alum => alum.employmentStatus === 'employed').length,
    unemployed: alumniList.filter(alum => alum.employmentStatus === 'unemployed').length
  };

  return stats;
};