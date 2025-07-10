import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API Base URL
export const API_BASE_URL = "http://localhost:5001";

// API Endpoints
export const API_ENDPOINTS = {
  // Files
  FILES_CREATE: "/files",
  FILES_GET_ALL: "/files",
  FILES_GET_BY_ID: (id: number) => `/files/${id}`,
  FILES_UPDATE: (id: number) => `/files/${id}`,
  FILES_DELETE: (id: number) => `/files/${id}`,

  // Documents - Updated to match backend controller
  DOCUMENTS_GENERATE_WORD: (foyNo: number) =>
    `/documents/generate/word/${foyNo}`,
  DOCUMENTS_GENERATE_PDF: (foyNo: number) => `/documents/generate/pdf/${foyNo}`,
  DOCUMENTS_GENERATE_HTML: (foyNo: number) =>
    `/documents/generate/html/${foyNo}`,
  DOCUMENTS_UPDATE_HTML: (foyNo: number) => `/documents/update/html/${foyNo}`,
};

// Helper function to make API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("url", url);

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Document generation functions
export async function generateWordDocument(
  foyNo: number,
  templateName?: string
) {
  return apiCall(API_ENDPOINTS.DOCUMENTS_GENERATE_WORD(foyNo), {
    method: "POST",
    body: JSON.stringify({ templateName }),
  });
}

export async function generatePdfDocument(foyNo: number) {
  return apiCall(API_ENDPOINTS.DOCUMENTS_GENERATE_PDF(foyNo), {
    method: "GET",
  });
}

// HTML document generation function
export async function generateHtmlDocument(foyNo: number) {
  return apiCall(API_ENDPOINTS.DOCUMENTS_GENERATE_HTML(foyNo), {
    method: "GET",
  });
}

// HTML document update function
export async function updateHtmlTemplate(foyNo: number, htmlContent: string) {
  return apiCall(API_ENDPOINTS.DOCUMENTS_UPDATE_HTML(foyNo), {
    method: "POST",
    body: JSON.stringify({ htmlContent }),
  });
}
