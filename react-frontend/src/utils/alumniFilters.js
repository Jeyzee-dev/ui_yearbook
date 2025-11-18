export const filterAlumni = (alumniList, filters) => {
  let filtered = [...alumniList];

  if (filters.batchYear) {
    filtered = filtered.filter(alum => alum.batchYear === filters.batchYear);
  }

  if (filters.program) {
    filtered = filtered.filter(alum => alum.program === filters.program);
  }

  if (filters.department) {
    filtered = filtered.filter(alum => alum.department === filters.department);
  }

  if (filters.section) {
    filtered = filtered.filter(alum => alum.section === filters.section);
  }

  if (filters.employmentStatus) {
    filtered = filtered.filter(alum => alum.employmentStatus === filters.employmentStatus);
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(alum =>
      alum.fullName.toLowerCase().includes(query) ||
      alum.program.toLowerCase().includes(query) ||
      alum.department.toLowerCase().includes(query) ||
      alum.currentCompany?.toLowerCase().includes(query) ||
      alum.position?.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const sortAlumni = (alumniList, sortBy, sortOrder = 'asc') => {
  const sorted = [...alumniList];

  sorted.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.fullName;
        bValue = b.fullName;
        break;
      case 'batchYear':
        aValue = parseInt(a.batchYear);
        bValue = parseInt(b.batchYear);
        break;
      case 'program':
        aValue = a.program;
        bValue = b.program;
        break;
      case 'employmentStatus':
        aValue = a.employmentStatus;
        bValue = b.employmentStatus;
        break;
      default:
        aValue = a.fullName;
        bValue = b.fullName;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

export const getUniqueValues = (alumniList, field) => {
  const values = alumniList.map(alum => alum[field]);
  return [...new Set(values)].filter(Boolean).sort();
};

export const getBatchYears = (alumniList) => {
  return getUniqueValues(alumniList, 'batchYear');
};

export const getPrograms = (alumniList) => {
  return getUniqueValues(alumniList, 'program');
};

export const getDepartments = (alumniList) => {
  return getUniqueValues(alumniList, 'department');
};

export const getSections = (alumniList) => {
  return getUniqueValues(alumniList, 'section');
};