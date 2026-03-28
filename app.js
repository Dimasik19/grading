const GRADE_RANGES = [
    { grade: 10, min: 135, max: 160 },
    { grade: 11, min: 161, max: 191 },
    { grade: 12, min: 192, max: 227 },
    { grade: 13, min: 228, max: 268 },
    { grade: 14, min: 269, max: 313 },
    { grade: 15, min: 314, max: 370 },
    { grade: 16, min: 371, max: 438 },
    { grade: 17, min: 439, max: 518 },
    { grade: 18, min: 519, max: 613 },
    { grade: 19, min: 614, max: 734 },
    { grade: 20, min: 735, max: 879 },
    { grade: 21, min: 880, max: 1055 },
    { grade: 22, min: 1056, max: 1260 },
    { grade: 23, min: 1261, max: 1507 },
    { grade: 24, min: 1508, max: 1800 },
    { grade: 25, min: 1801, max: 2140 },
    { grade: 26, min: 2141, max: 2550 },
    { grade: 27, min: 2551, max: 3020 },
    { grade: 28, min: 3021, max: 3580 }
];

const GRADE_LEVELS = [...GRADE_RANGES].map(({ grade }) => grade).sort((a, b) => b - a);
const KNOW_HOW_VALUES = [
    50, 57, 66, 76, 87, 100, 115, 132, 152, 175, 200, 230,
    264, 304, 350, 400, 460, 528, 608, 700, 800, 920, 1056, 1216, 1400
];
const PROBLEM_SOLVING_PERCENT_VALUES = [12, 14, 16, 19, 22, 25, 29, 33, 38, 43, 50, 57, 66, 76, 87];
const SHORT_PROFILE_VALUES = ["A4", "A3", "A2", "A1", "L", "P1", "P2", "P3"];
const ACCOUNTABILITY_PERCENT_MATRIX = {
    10: { A4: 15, A3: 13, A2: 11, A1: 10, L: 9, P1: 8, P2: 7, P3: 5 },
    12: { A4: 16, A3: 15, A2: 13, A1: 11, L: 10, P1: 9, P2: 8, P3: 6 },
    14: { A4: 18, A3: 16, A2: 14, A1: 13, L: 11, P1: 10, P2: 9, P3: 7 },
    16: { A4: 20, A3: 18, A2: 16, A1: 14, L: 12, P1: 11, P2: 10, P3: 8 },
    19: { A4: 22, A3: 19, A2: 17, A1: 15, L: 14, P1: 12, P2: 11, P3: 9 },
    22: { A4: 24, A3: 21, A2: 19, A1: 17, L: 15, P1: 13, P2: 12, P3: 10 },
    25: { A4: 26, A3: 23, A2: 21, A1: 19, L: 17, P1: 15, P2: 13, P3: 12 },
    29: { A4: 28, A3: 25, A2: 23, A1: 20, L: 18, P1: 16, P2: 15, P3: 13 },
    33: { A4: 30, A3: 27, A2: 25, A1: 22, L: 20, P1: 18, P2: 16, P3: 14 },
    38: { A4: 32, A3: 30, A2: 27, A1: 24, L: 22, P1: 19, P2: 17, P3: 15 },
    43: { A4: 35, A3: 32, A2: 29, A1: 26, L: 23, P1: 21, P2: 19, P3: 17 },
    50: { A4: 37, A3: 34, A2: 31, A1: 28, L: 25, P1: 22, P2: 20, P3: 18 },
    57: { A4: 39, A3: 36, A2: 32, A1: 29, L: 27, P1: 24, P2: 22, P3: 19 },
    66: { A4: 41, A3: 38, A2: 34, A1: 31, L: 28, P1: 26, P2: 23, P3: 21 },
    76: { A4: 43, A3: 40, A2: 36, A1: 33, L: 30, P1: 27, P2: 25, P3: 22 },
    87: { A4: 45, A3: 41, A2: 38, A1: 35, L: 32, P1: 29, P2: 26, P3: 23 }
};
const SCORE_RANGES = {
    knowHow: 1800,
    problemSolving: 900,
    accountability: 900
};
const STORAGE_KEY = "grading_positions_v8";

const dom = {
    functionSelect: document.getElementById("functionSelect"),
    companyFilters: document.getElementById("companyFilters"),
    gradesList: document.getElementById("gradesList"),
    detailsPanel: document.getElementById("detailsPanel"),
    hideEmptyCheckbox: document.getElementById("hideEmptyGrades"),
    checkboxWrapper: document.getElementById("checkboxWrapper"),
    compareBtn: document.getElementById("compareBtn"),
    comparePositionsBtn: document.getElementById("comparePositionsBtn"),
    exportExcelBtn: document.getElementById("exportExcelBtn"),
    manageBandsBtn: document.getElementById("manageBandsBtn"),
    structurePanel: document.getElementById("structurePanel"),
    btnAdd: document.getElementById("btnAdd"),
    panelTitle: document.getElementById("panelTitle"),
    modalOverlay: document.getElementById("modalOverlay"),
    modalHeaderTitle: document.getElementById("modalHeaderTitle"),
    modalTitle: document.getElementById("modalTitle"),
    modalFunction: document.getElementById("modalFunction"),
    modalCompany: document.getElementById("modalCompany"),
    modalDesc: document.getElementById("modalDesc"),
    modalScoreKH: document.getElementById("modalScoreKH"),
    modalScorePS: document.getElementById("modalScorePS"),
    modalShortProfile: document.getElementById("modalShortProfile"),
    modalGradeDisplay: document.getElementById("modalGradeDisplay"),
    modalGradeFormula: document.getElementById("modalGradeFormula"),
    modalCancelBtn: document.getElementById("modalCancelBtn"),
    modalSaveBtn: document.getElementById("modalSaveBtn"),
    bandsModalOverlay: document.getElementById("bandsModalOverlay"),
    hideBandsInScaleCheckbox: document.getElementById("hideBandsInScaleCheckbox"),
    bandsEditorList: document.getElementById("bandsEditorList"),
    addBandRowBtn: document.getElementById("addBandRowBtn"),
    bandsModalCancelBtn: document.getElementById("bandsModalCancelBtn"),
    bandsModalSaveBtn: document.getElementById("bandsModalSaveBtn"),
    deleteConfirmOverlay: document.getElementById("deleteConfirmOverlay"),
    deleteConfirmText: document.getElementById("deleteConfirmText"),
    deleteConfirmCancelBtn: document.getElementById("deleteConfirmCancelBtn"),
    deleteConfirmSubmitBtn: document.getElementById("deleteConfirmSubmitBtn")
};

const storage = {
    loadSaved() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.warn("Не удалось прочитать localStorage.", error);
            return null;
        }
    },
    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};

const state = {
    companies: [],
    companyMap: {},
    families: [],
    familyMap: {},
    positionsByFamily: {},
    currentFunction: "all",
    currentPositionId: null,
    selectedCompany: "all",
    isComparing: false,
    isComparingPositions: false,
    comparisonFilters: {},
    comparisonPositionSlots: Array.from({ length: 3 }, () => ({
        companyId: "",
        familyId: "",
        positionId: ""
    })),
    customBands: [],
    bandDrafts: [],
    showBandsInScale: true,
    bandVisibilityDraft: true,
    isEditorMode: false,
    modalMode: "create",
    editingPositionId: null,
    pendingDeletePositionId: null
};

function el(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function createBandId() {
    return `band_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptyBandDraft() {
    return {
        id: createBandId(),
        name: "Бэнд 1",
        description: "",
        grades: []
    };
}

function expandGradeRange(fromGrade, toGrade) {
    const fromIndex = GRADE_LEVELS.indexOf(Number(fromGrade));
    const toIndex = GRADE_LEVELS.indexOf(Number(toGrade));
    if (fromIndex === -1 || toIndex === -1) return [];

    const startIndex = Math.min(fromIndex, toIndex);
    const endIndex = Math.max(fromIndex, toIndex);
    return GRADE_LEVELS.slice(startIndex, endIndex + 1);
}

function getGradeSortValue(grade) {
    const index = GRADE_LEVELS.indexOf(Number(grade));
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortGradesDescending(grades) {
    return [...grades].sort((a, b) => getGradeSortValue(a) - getGradeSortValue(b));
}

function normalizeCustomBands(customBands) {
    if (!Array.isArray(customBands)) return [];

    const usedGrades = new Set();

    return customBands.reduce((bands, band, index) => {
        const grades = sortGradesDescending(
            [...new Set((band?.grades || [])
                .map((grade) => Number(grade))
                .filter((grade) => GRADE_LEVELS.includes(grade))
            )]
        ).filter((grade) => {
            if (usedGrades.has(grade)) return false;
            usedGrades.add(grade);
            return true;
        });

        const hasName = typeof band?.name === "string" && band.name.trim();
        if (!hasName || !grades.length) return bands;

        bands.push({
            id: band.id || `band_${index + 1}`,
            name: band.name.trim(),
            description: typeof band?.description === "string" ? band.description.trim() : "",
            grades
        });

        return bands;
    }, []);
}

function getGradeBandMap(customBands = state.customBands) {
    return customBands.reduce((map, band) => {
        band.grades.forEach((grade) => {
            map[grade] = band;
        });
        return map;
    }, {});
}

function getBandForGrade(grade, gradeBandMap = getGradeBandMap()) {
    return gradeBandMap[grade] || null;
}

function getBandDraftRange(band) {
    const grades = sortGradesDescending(band.grades || []);
    return {
        fromGrade: grades[0] ?? "",
        toGrade: grades[grades.length - 1] ?? ""
    };
}

function getOccupiedGradesByOtherBands(targetBandId) {
    const occupiedGrades = new Set();

    state.bandDrafts.forEach((band) => {
        if (band.id === targetBandId) return;
        (band.grades || []).forEach((grade) => occupiedGrades.add(grade));
    });

    return occupiedGrades;
}

function getAvailableGradesForBand(targetBandId) {
    const occupiedGrades = getOccupiedGradesByOtherBands(targetBandId);
    return GRADE_LEVELS.filter((grade) => !occupiedGrades.has(grade));
}

function parseSavedState(savedData) {
    if (!savedData) {
        return {
            positionsByFamily: null,
            customBands: [],
            showBandsInScale: true
        };
    }

    if (savedData.positionsByFamily) {
        return {
            positionsByFamily: savedData.positionsByFamily,
            customBands: normalizeCustomBands(savedData.settings?.customBands || []),
            showBandsInScale: savedData.settings?.showBandsInScale !== false
        };
    }

    return {
        positionsByFamily: savedData,
        customBands: [],
        showBandsInScale: true
    };
}

function replaceWithPlaceholder(container, text, styles = {}) {
    const placeholder = el("div", "placeholder", text);
    Object.assign(placeholder.style, styles);
    container.replaceChildren(placeholder);
}

function calculateGrade(totalScore) {
    const range = GRADE_RANGES.find((item) => totalScore >= item.min && totalScore <= item.max);
    return range ? range.grade : null;
}

function snapToNearestAllowedValue(value, allowedValues) {
    const numericValue = Number(value) || 0;
    return allowedValues.reduce((closest, current) => {
        const currentDistance = Math.abs(current - numericValue);
        const closestDistance = Math.abs(closest - numericValue);

        if (currentDistance < closestDistance) return current;
        if (currentDistance === closestDistance && current < closest) return current;
        return closest;
    }, allowedValues[0]);
}

function calculateProblemSolvingScore(knowHow, percent) {
    return Math.round(((Number(knowHow) || 0) * (Number(percent) || 0)) / 100);
}

function calculateAccountabilityScore(knowHow, percent) {
    return Math.round(((Number(knowHow) || 0) * (Number(percent) || 0)) / 100);
}

function getAccountabilityPercent(problemSolvingPercent, shortProfile) {
    const profileMatrix = ACCOUNTABILITY_PERCENT_MATRIX[problemSolvingPercent];
    return profileMatrix ? profileMatrix[shortProfile] ?? null : null;
}

function normalizeAccountability(position) {
    if (!position.scores) return;

    const accountabilityPercent = getAccountabilityPercent(
        Number(position.problemSolvingPercent),
        position.shortProfile
    );

    if (accountabilityPercent === null) {
        position.scores.accountability = Math.min(
            Number(position.scores.accountability) || 0,
            Number(position.scores.problemSolving) || 0
        );
        return;
    }

    position.accountabilityPercent = accountabilityPercent;
    position.scores.accountability = calculateAccountabilityScore(position.scores.knowHow, accountabilityPercent);
}

function normalizeProblemSolving(position) {
    if (!position.scores) return;

    const knowHow = Number(position.scores.knowHow) || 0;
    const currentProblemSolving = Number(position.scores.problemSolving) || 0;
    const rawPercent = knowHow > 0
        ? (currentProblemSolving / knowHow) * 100
        : PROBLEM_SOLVING_PERCENT_VALUES[0];
    const normalizedPercent = snapToNearestAllowedValue(rawPercent, PROBLEM_SOLVING_PERCENT_VALUES);

    position.problemSolvingPercent = normalizedPercent;
    position.scores.problemSolving = calculateProblemSolvingScore(knowHow, normalizedPercent);
}

function getTotalScore(position) {
    return position.scores.knowHow + position.scores.problemSolving + position.scores.accountability;
}

function getAllPositions() {
    return Object.values(state.positionsByFamily).flat();
}

function getSortableJobIdValue(jobId) {
    const match = String(jobId || "").match(/^JOB-(\d+)$/);
    return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function escapeXml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function escapeHtml(value) {
    return escapeXml(value);
}

function createExcelCell(value, type = "String") {
    return `<Cell><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`;
}

function createPdfComparisonCardHtml(position, index) {
    const totalScore = getTotalScore(position);
    const band = getBandForGrade(position.grade);
    const description = position.description || "Описание не заполнено";

    return `
        <section class="pdf-card">
            <div class="pdf-card-header">
                <div>
                    <div class="pdf-label">Должность ${index + 1}</div>
                    <h2>${escapeHtml(position.title)}</h2>
                    <div class="pdf-meta">
                        Job ID: ${escapeHtml(position.job_id)} | Компания: ${escapeHtml(position.companyName)} | Функция: ${escapeHtml(position.familyName)}
                    </div>
                </div>
                <div class="pdf-grade-box">
                    <div class="pdf-label">Итоговый грейд</div>
                    <div class="pdf-grade-value">${escapeHtml(position.grade)}</div>
                </div>
            </div>

            <div class="pdf-section">
                <div class="pdf-section-title">Краткое описание</div>
                <div class="pdf-description">${escapeHtml(description)}</div>
            </div>

            <div class="pdf-section">
                <div class="pdf-section-title">Профиль оценки</div>
                <table class="pdf-table">
                    <tr><td>Know-How</td><td>${escapeHtml(position.scores.knowHow)}</td></tr>
                    <tr><td>Решение проблем</td><td>${escapeHtml(position.scores.problemSolving)} (${escapeHtml(position.problemSolvingPercent)}%)</td></tr>
                    <tr><td>Ответственность</td><td>${escapeHtml(position.scores.accountability)} (${escapeHtml(position.accountabilityPercent)}%, ${escapeHtml(position.shortProfile)})</td></tr>
                </table>
            </div>

            <div class="pdf-total-box">
                <div class="pdf-total-value">Итого баллов: ${escapeHtml(totalScore)}</div>
                <div class="pdf-total-note">Соответствует грейду ${escapeHtml(position.grade)}${band ? ` и бэнду ${escapeHtml(band.name)}` : ""}</div>
            </div>
        </section>
    `;
}

function exportComparisonPositionsToPdf() {
    const selectedPositions = state.comparisonPositionSlots
        .map((slot) => slot.positionId ? getPositionById(slot.positionId) : null)
        .filter(Boolean);

    if (!selectedPositions.length) {
        alert("Выберите хотя бы одну должность для выгрузки в PDF.");
        return;
    }

    const printWindow = window.open("", "_blank", "width=1400,height=900");
    if (!printWindow) {
        alert("Не удалось открыть окно печати. Проверьте, не заблокированы ли всплывающие окна.");
        return;
    }

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Position comparison</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 24px;
            color: #243746;
            background: white;
        }
        .pdf-page-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
        }
        .pdf-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
        }
        .pdf-card {
            border: 1px solid #d9e4ee;
            border-radius: 16px;
            padding: 18px;
            box-sizing: border-box;
            break-inside: avoid;
            background: #fbfdff;
        }
        .pdf-card-header {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .pdf-card h2 {
            margin: 6px 0 8px 0;
            font-size: 24px;
            line-height: 1.15;
        }
        .pdf-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #6a7f91;
            font-weight: 700;
        }
        .pdf-meta {
            font-size: 12px;
            line-height: 1.45;
            color: #667684;
        }
        .pdf-grade-box {
            min-width: 110px;
            border: 1px solid #c8ddf2;
            background: linear-gradient(180deg, #eff7ff 0%, #deefff 100%);
            border-radius: 14px;
            padding: 12px 14px;
            text-align: center;
        }
        .pdf-grade-value {
            margin-top: 8px;
            font-size: 30px;
            font-weight: 800;
            color: #1e5f95;
        }
        .pdf-section {
            margin-bottom: 16px;
        }
        .pdf-section-title {
            font-size: 13px;
            font-weight: 700;
            color: #455a6f;
            margin-bottom: 8px;
        }
        .pdf-description {
            border: 1px solid #e0e6ed;
            border-radius: 10px;
            background: #f9fbfd;
            padding: 12px 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            min-height: 84px;
        }
        .pdf-table {
            width: 100%;
            border-collapse: collapse;
        }
        .pdf-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e8eef3;
            font-size: 14px;
        }
        .pdf-table td:last-child {
            text-align: right;
            font-weight: 700;
        }
        .pdf-total-box {
            margin-top: 14px;
            border: 1px solid #d5e3ef;
            border-radius: 14px;
            padding: 16px;
            text-align: center;
            background: linear-gradient(180deg, #f5f9fd 0%, #ebf4fb 100%);
        }
        .pdf-total-value {
            font-size: 22px;
            font-weight: 800;
        }
        .pdf-total-note {
            margin-top: 6px;
            font-size: 13px;
            color: #6e7d89;
        }
        @page {
            size: landscape;
            margin: 12mm;
        }
        @media print {
            body {
                padding: 12px;
                zoom: 0.8;
            }
            .pdf-grid {
                gap: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="pdf-page-title">Position comparison</div>
    <div class="pdf-grid">
        ${selectedPositions.map((position, index) => createPdfComparisonCardHtml(position, index)).join("")}
    </div>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

function handleExportAction() {
    if (state.isComparingPositions) {
        exportComparisonPositionsToPdf();
        return;
    }
    exportAllPositionsToExcel();
}

function exportAllPositionsToExcel() {
    const rows = getAllPositions()
        .slice()
        .sort((a, b) => getSortableJobIdValue(a.job_id) - getSortableJobIdValue(b.job_id))
        .map((position) => [
            position.job_id || "",
            position.title || "",
            position.companyName || getCompanyName(position.company),
            position.familyName || getFamilyName(position.familyId),
            position.grade ?? "",
            getTotalScore(position),
            position.scores?.knowHow ?? 0,
            position.scores?.problemSolving ?? 0,
            position.scores?.accountability ?? 0,
            position.problemSolvingPercent ?? "",
            position.accountabilityPercent ?? "",
            position.shortProfile ?? "",
            position.description || ""
        ]);

    if (!rows.length) {
        alert("Нет данных для выгрузки.");
        return;
    }

    const header = [
        "job_id",
        "название должности",
        "компания",
        "функция",
        "грейд",
        "общие баллы",
        "баллы знания",
        "баллы решение проблем",
        "баллы ответственность",
        "% решения проблем",
        "% ответственности",
        "короткий профиль",
        "короткое описание"
    ];

    const workbookXml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Positions">
  <Table>
   <Row>${header.map((value) => createExcelCell(value)).join("")}</Row>
${rows.map((row) => `   <Row>${row.map((value, index) => createExcelCell(value, ([4, 5, 6, 7, 8, 9, 10].includes(index)) ? "Number" : "String")).join("")}</Row>`).join("\n")}
  </Table>
 </Worksheet>
</Workbook>`;

    const blob = new Blob([workbookXml], {
        type: "application/vnd.ms-excel;charset=utf-8;"
    });
    const link = document.createElement("a");
    const fileDate = new Date().toISOString().slice(0, 10);

    link.href = URL.createObjectURL(blob);
    link.download = `positions_export_${fileDate}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function getNextJobId() {
    const maxId = getAllPositions()
        .map((position) => {
            const match = String(position.job_id || "").match(/^JOB-(\d+)$/);
            return match ? Number(match[1]) : 0;
        })
        .reduce((max, current) => Math.max(max, current), 0);

    return `JOB-${String(maxId + 1).padStart(5, "0")}`;
}

function normalizePositions(positionsByFamily) {
    Object.values(positionsByFamily).forEach((positions) => {
        positions.forEach((position) => {
            if (position.scores) {
                position.scores.knowHow = snapToNearestAllowedValue(position.scores.knowHow, KNOW_HOW_VALUES);
                normalizeProblemSolving(position);
                normalizeAccountability(position);
            }
            const calculatedGrade = calculateGrade(getTotalScore(position));
            if (calculatedGrade !== null) {
                position.grade = calculatedGrade;
            }
            if (!position.job_id) {
                position.job_id = getNextJobId();
            }
        });
    });

    return positionsByFamily;
}

function enrichPositions(positionsByFamily) {
    Object.entries(positionsByFamily).forEach(([familyId, positions]) => {
        const familyName = getFamilyName(familyId);
        positions.forEach((position) => {
            position.familyId = familyId;
            position.familyName = position.familyName || familyName;
        });
    });

    return positionsByFamily;
}

async function loadCatalog() {
    const response = await fetch("data.json");
    if (!response.ok) {
        throw new Error(`Не удалось загрузить data.json: ${response.status}`);
    }

    return response.json();
}

function getFamilyName(familyId) {
    return state.familyMap[familyId]?.name || familyId;
}

function getCompanyName(companyId) {
    if (companyId === "all") return "Все компании";
    return state.companyMap[companyId]?.name || companyId;
}

function getFilteredPositions(familyId) {
    const positions = state.positionsByFamily[familyId] || [];
    if (state.selectedCompany === "all") {
        return positions;
    }

    return positions.filter((position) => position.company === state.selectedCompany);
}

function getCurrentPositions() {
    if (!state.currentFunction) return [];
    if (state.currentFunction === "all") {
        return state.families.flatMap((family) => getFilteredPositions(family.id));
    }
    return getFilteredPositions(state.currentFunction);
}

function getCompanyFilterPositionsBase() {
    if (!state.currentFunction) return [];
    if (state.currentFunction === "all") {
        return state.families.flatMap((family) => state.positionsByFamily[family.id] || []);
    }

    return state.positionsByFamily[state.currentFunction] || [];
}

function getCurrentPosition() {
    return getAllPositions().find((position) => position.id === state.currentPositionId) || null;
}

function persist() {
    storage.save({
        positionsByFamily: state.positionsByFamily,
        settings: {
            customBands: state.customBands,
            showBandsInScale: state.showBandsInScale
        }
    });
}

function populateKnowHowOptions() {
    const currentValue = dom.modalScoreKH.value;
    dom.modalScoreKH.replaceChildren();

    KNOW_HOW_VALUES.forEach((value) => {
        const option = el("option", "", String(value));
        option.value = String(value);
        dom.modalScoreKH.appendChild(option);
    });

    if (KNOW_HOW_VALUES.some((value) => String(value) === currentValue)) {
        dom.modalScoreKH.value = currentValue;
    } else {
        dom.modalScoreKH.value = String(KNOW_HOW_VALUES[0]);
    }
}

function populateProblemSolvingOptions() {
    const currentValue = dom.modalScorePS.value;
    dom.modalScorePS.replaceChildren();

    PROBLEM_SOLVING_PERCENT_VALUES.forEach((value) => {
        const option = el("option", "", String(value));
        option.value = String(value);
        dom.modalScorePS.appendChild(option);
    });

    if (PROBLEM_SOLVING_PERCENT_VALUES.some((value) => String(value) === currentValue)) {
        dom.modalScorePS.value = currentValue;
    } else {
        dom.modalScorePS.value = String(PROBLEM_SOLVING_PERCENT_VALUES[0]);
    }
}

function populateShortProfileOptions() {
    const currentValue = dom.modalShortProfile.value;
    dom.modalShortProfile.replaceChildren();

    SHORT_PROFILE_VALUES.forEach((value) => {
        const option = el("option", "", value);
        option.value = value;
        dom.modalShortProfile.appendChild(option);
    });

    if (SHORT_PROFILE_VALUES.includes(currentValue)) {
        dom.modalShortProfile.value = currentValue;
    } else {
        dom.modalShortProfile.value = SHORT_PROFILE_VALUES[0];
    }
}

function populateSelectors() {
    const familyOptions = state.families.map((family) => ({ value: family.id, label: family.name }));
    const companyOptions = state.companies.map((company) => ({ value: company.id, label: company.name }));

    const functionCurrentValue = dom.functionSelect.value;
    dom.functionSelect.replaceChildren(el("option", "", "All functions"));
    dom.functionSelect.firstElementChild.value = "all";
    familyOptions.forEach((optionData) => {
        const option = el("option", "", optionData.label);
        option.value = optionData.value;
        dom.functionSelect.appendChild(option);
    });
    dom.functionSelect.value = familyOptions.some((optionData) => optionData.value === functionCurrentValue) || functionCurrentValue === "all"
        ? functionCurrentValue
        : "all";

    const modalCurrentValue = dom.modalFunction.value;
    dom.modalFunction.replaceChildren(el("option", "", "-- Выберите --"));
    dom.modalFunction.firstElementChild.value = "";
    familyOptions.forEach((optionData) => {
        const option = el("option", "", optionData.label);
        option.value = optionData.value;
        dom.modalFunction.appendChild(option);
    });
    if (familyOptions.some((optionData) => optionData.value === modalCurrentValue)) {
        dom.modalFunction.value = modalCurrentValue;
    }

    dom.modalCompany.replaceChildren(el("option", "", "-- Выберите --"));
    dom.modalCompany.firstElementChild.value = "";

    companyOptions.forEach((optionData) => {
        const option = el("option", "", optionData.label);
        option.value = optionData.value;
        dom.modalCompany.appendChild(option);
    });

    populateKnowHowOptions();
    populateProblemSolvingOptions();
    populateShortProfileOptions();
}

function renderCompanyFilters() {
    const fragment = document.createDocumentFragment();
    const basePositions = getCompanyFilterPositionsBase();
    const allButton = el(
        "button",
        `company-filter-btn${state.selectedCompany === "all" ? " active" : ""}`,
        `Все компании (${basePositions.length})`
    );
    allButton.type = "button";
    allButton.dataset.companyId = "all";
    fragment.appendChild(allButton);

    state.companies.forEach((company) => {
        const companyCount = basePositions.filter((position) => position.company === company.id).length;
        const button = el(
            "button",
            `company-filter-btn${state.selectedCompany === company.id ? " active" : ""}`,
            `${company.name} (${companyCount})`
        );
        button.type = "button";
        button.dataset.companyId = company.id;
        fragment.appendChild(button);
    });

    dom.companyFilters.replaceChildren(fragment);
}

function updateCalculatedGrade() {
    const kh = snapToNearestAllowedValue(parseInt(dom.modalScoreKH.value, 10) || 0, KNOW_HOW_VALUES);
    const psPercent = snapToNearestAllowedValue(parseInt(dom.modalScorePS.value, 10) || 0, PROBLEM_SOLVING_PERCENT_VALUES);
    const ps = calculateProblemSolvingScore(kh, psPercent);
    const shortProfile = dom.modalShortProfile.value;
    const accountabilityPercent = getAccountabilityPercent(psPercent, shortProfile);

    if (accountabilityPercent === null) {
        dom.modalGradeDisplay.textContent = "Грейд: нельзя рассчитать";
        dom.modalGradeFormula.textContent = `Для сочетания PS ${psPercent}% и профиля ${shortProfile} нет правила ответственности.`;
        dom.modalScoreKH.value = String(kh);
        dom.modalScorePS.value = String(psPercent);
        return;
    }

    const acc = calculateAccountabilityScore(kh, accountabilityPercent);
    const total = kh + ps + acc;
    const grade = calculateGrade(total);

    dom.modalScoreKH.value = String(kh);
    dom.modalScorePS.value = String(psPercent);

    dom.modalGradeDisplay.textContent = grade === null
        ? `Грейд: вне диапазона (Сумма: ${total})`
        : `Грейд: ${grade} (Сумма: ${total})`;
    dom.modalGradeFormula.textContent = `Know-How ${kh} + Problem Solving ${ps} (${psPercent}%) + Accountability ${acc} (${accountabilityPercent}%, профиль ${shortProfile}) = ${total}`;
}

function createBandMarker({ band, hasPositions, bandSegment = "none", showBandName = false }) {
    const marker = el("div", `band-marker${band ? " has-band" : ""}${hasPositions ? " has-positions" : ""}${band ? ` band-${bandSegment}` : ""}`);
    marker.appendChild(el("div", "band-line"));

    if (band && showBandName) {
        const chip = el("div", "band-name", band.name);
        chip.title = `${band.name}: ${band.grades.join(", ")}`;
        marker.appendChild(chip);
    }

    return marker;
}

function renderBandsEditor() {
    const fragment = document.createDocumentFragment();

    if (!state.bandDrafts.length) {
        fragment.appendChild(el("div", "bands-empty-state", "Пока нет пользовательских бэндов. Добавьте первый бэнд и выберите для него грейды."));
    }

    state.bandDrafts.forEach((band, index) => {
        const card = el("div", "band-editor-card");
        card.dataset.bandId = band.id;

        const header = el("div", "band-editor-header");
        const headingWrap = el("div", "band-editor-heading");
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "band-editor-name-input";
        nameInput.placeholder = `Бэнд ${index + 1}`;
        nameInput.value = band.name;
        nameInput.dataset.bandId = band.id;
        nameInput.dataset.field = "name";

        const descriptionInput = document.createElement("textarea");
        descriptionInput.className = "band-editor-description-input";
        descriptionInput.rows = 2;
        descriptionInput.placeholder = "Короткое описание бэнда";
        descriptionInput.value = band.description || "";
        descriptionInput.dataset.bandId = band.id;
        descriptionInput.dataset.field = "description";
        headingWrap.append(nameInput, descriptionInput);

        header.append(
            headingWrap,
            (() => {
                const removeButton = el("button", "band-remove-btn", "Удалить");
                removeButton.type = "button";
                removeButton.dataset.action = "remove-band";
                removeButton.dataset.bandId = band.id;
                return removeButton;
            })()
        );

        const gradesGroup = el("div", "modal-input-group");
        gradesGroup.appendChild(el("label", "", "Диапазон грейдов"));

        const availableGrades = getAvailableGradesForBand(band.id);
        const currentRange = getBandDraftRange(band);
        const fromGrade = currentRange.fromGrade || availableGrades[0] || "";
        const toGrade = currentRange.toGrade || fromGrade;

        const rangeRow = el("div", "band-range-row");
        const fromWrap = el("div", "band-range-field");
        const fromLabel = el("label", "", "От");
        const fromSelect = document.createElement("select");
        fromSelect.dataset.bandId = band.id;
        fromSelect.dataset.field = "from-grade";

        const toWrap = el("div", "band-range-field");
        const toLabel = el("label", "", "До");
        const toSelect = document.createElement("select");
        toSelect.dataset.bandId = band.id;
        toSelect.dataset.field = "to-grade";

        availableGrades.forEach((grade) => {
            const fromOption = el("option", "", String(grade));
            fromOption.value = String(grade);
            fromSelect.appendChild(fromOption);

            const toOption = el("option", "", String(grade));
            toOption.value = String(grade);
            toSelect.appendChild(toOption);
        });

        fromSelect.value = availableGrades.includes(Number(fromGrade)) ? String(fromGrade) : String(availableGrades[0] || "");
        toSelect.value = availableGrades.includes(Number(toGrade)) ? String(toGrade) : fromSelect.value;

        fromWrap.append(fromLabel, fromSelect);
        toWrap.append(toLabel, toSelect);
        rangeRow.append(fromWrap, toWrap);

        const hint = el("div", "band-range-hint", "Можно выбрать один грейд, если указать одинаковые значения в полях «От» и «До». Занятые в других бэндах грейды недоступны.");
        gradesGroup.append(rangeRow, hint);
        card.append(header, gradesGroup);
        fragment.appendChild(card);
    });

    dom.bandsEditorList.replaceChildren(fragment);
}

function renderStructure() {
    if (!state.currentFunction) {
        replaceWithPlaceholder(dom.gradesList, "Выберите функцию", { padding: "20px" });
        return;
    }

    const positions = getCurrentPositions();
    const fragment = document.createDocumentFragment();
    const hideEmpty = dom.hideEmptyCheckbox.checked;
    const hasCustomBands = state.customBands.length > 0 && state.showBandsInScale;
    const gradeBandMap = getGradeBandMap();
    const visibleGrades = GRADE_LEVELS.filter((grade) => {
        const positionsInGrade = positions.filter((position) => position.grade === grade);
        return !(hideEmpty && positionsInGrade.length === 0);
    });
    const bandVisibleRows = visibleGrades.reduce((map, grade) => {
        const band = getBandForGrade(grade, gradeBandMap);
        if (!band) return map;
        if (!map[band.id]) {
            map[band.id] = [];
        }
        map[band.id].push(grade);
        return map;
    }, {});

    GRADE_LEVELS.forEach((grade) => {
        const positionsInGrade = positions.filter((position) => position.grade === grade);
        if (hideEmpty && positionsInGrade.length === 0) return;

        const band = getBandForGrade(grade, gradeBandMap);
        const bandGrades = band ? (bandVisibleRows[band.id] || []) : [];
        const bandIndex = bandGrades.indexOf(grade);
        const isSingle = bandIndex === 0 && bandGrades.length === 1;
        const isStart = bandIndex === 0 && bandGrades.length > 1;
        const isEnd = bandIndex === bandGrades.length - 1 && bandGrades.length > 1;
        const bandSegment = !band
            ? "none"
            : isSingle
                ? "single"
                : isStart
                    ? "start"
                    : isEnd
                        ? "end"
                        : "middle";
        const showBandName = band ? bandIndex === Math.floor((bandGrades.length - 1) / 2) : false;
        const row = el("div", `grade-row${positionsInGrade.length ? " has-positions" : ""}${band ? " has-band" : ""}${hasCustomBands ? " with-bands" : ""}`);

        if (hasCustomBands) {
            row.appendChild(createBandMarker({
                band,
                hasPositions: positionsInGrade.length > 0,
                bandSegment,
                showBandName
            }));
        }

        const marker = el("div", "grade-marker");
        marker.append(el("div", "grade-line"), el("div", "grade-number", String(grade)));

        const content = el("div", `grade-content${positionsInGrade.length ? " active-bg" : ""}`);

        if (positionsInGrade.length) {
            positionsInGrade.forEach((position) => {
                const card = el("button", `position-card${state.currentPositionId === position.id ? " active" : ""}`);
                card.type = "button";
                card.dataset.positionId = position.id;

                const textWrap = el("div", "position-text");
                textWrap.append(
                    el("div", "position-title", position.title),
                    el("div", "position-company", state.currentFunction === "all"
                        ? `${position.companyName} • ${position.familyName}`
                        : position.companyName)
                );

                card.append(textWrap, el("div", "emp-count-badge", String(position.employeesCount || 0)));
                content.appendChild(card);
            });
        } else {
            content.appendChild(el("div", "empty-placeholder", "-"));
        }

        row.append(marker, content);
        fragment.appendChild(row);
    });

    dom.gradesList.replaceChildren(fragment);
}

function renderFilterList() {
    const list = el("div", "filter-list");

    state.families.forEach((family) => {
        if (!(family.id in state.comparisonFilters)) {
            state.comparisonFilters[family.id] = true;
        }

        const item = el("div", "filter-item");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `filter_${family.id}`;
        checkbox.className = "family-filter";
        checkbox.dataset.familyId = family.id;
        checkbox.checked = state.comparisonFilters[family.id];

        const label = el("label", "", family.name);
        label.htmlFor = checkbox.id;

        item.append(checkbox, label);
        list.appendChild(item);
    });

    dom.gradesList.replaceChildren(list);
}

function renderComparisonView() {
    const enabledFamilies = state.families.filter((family) => state.comparisonFilters[family.id] !== false);
    if (!enabledFamilies.length) {
        replaceWithPlaceholder(dom.detailsPanel, "Выберите хотя бы одну семью для сравнения");
        return;
    }

    const container = el("div", "comparison-container");

    enabledFamilies.forEach((family) => {
        const positions = getFilteredPositions(family.id);
        const column = el("div", "compare-column");
        const header = el("div", "compare-header");
        header.append(
            el("div", "compare-family-name", family.name),
            el("div", "compare-company-name", getCompanyName(state.selectedCompany))
        );

        const body = el("div", "compare-body");

        GRADE_LEVELS.forEach((grade) => {
            const positionsInGrade = positions.filter((position) => position.grade === grade);
            const row = el("div", "mini-grade-row");
            const content = el("div", "mini-grade-content");

            if (positionsInGrade.length) {
                positionsInGrade.forEach((position) => {
                    const card = el("div", "mini-pos-card");
                    card.title = `${position.title} (${position.companyName})`;
                    card.append(
                        el("span", "", position.title),
                        el("span", "mini-emp-badge", String(position.employeesCount || 0))
                    );
                    content.appendChild(card);
                });
            } else {
                content.appendChild(el("div", "mini-empty"));
            }

            row.append(el("div", "mini-grade-num", String(grade)), content);
            body.appendChild(row);
        });

        column.append(header, body);
        container.appendChild(column);
    });

    dom.detailsPanel.replaceChildren(container);
}

function getPositionById(positionId) {
    return getAllPositions().find((position) => position.id === positionId) || null;
}

function getSortedPositionsList(positions) {
    return positions
        .slice()
        .sort((a, b) => {
            const titleCompare = String(a.title || "").localeCompare(String(b.title || ""), "ru");
            if (titleCompare !== 0) return titleCompare;
            return getSortableJobIdValue(a.job_id) - getSortableJobIdValue(b.job_id);
        });
}

function getComparisonCompanies() {
    return state.companies.slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ru"));
}

function getComparisonFamiliesByCompany(companyId) {
    if (!companyId) return [];

    const familyIds = new Set(
        getAllPositions()
            .filter((position) => position.company === companyId)
            .map((position) => position.familyId)
    );

    return state.families
        .filter((family) => familyIds.has(family.id))
        .slice()
        .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ru"));
}

function getComparisonPositions(companyId, familyId) {
    if (!companyId || !familyId) return [];

    return getSortedPositionsList(
        getAllPositions().filter((position) => position.company === companyId && position.familyId === familyId)
    );
}

function createScoreRow(labelText, value, maxValue, color, displayValue = String(value)) {
    const row = el("div", "score-row");
    const header = el("div", "score-header");
    const label = el("div", "score-label", labelText);
    const valueNode = el("div", "score-value", displayValue);
    const bar = el("div", "score-bar");
    bar.style.width = `${maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0}%`;
    bar.style.background = color;

    const barContainer = el("div", "score-bar-container");
    barContainer.appendChild(bar);
    header.append(label, valueNode);
    row.append(header, barContainer);
    return row;
}

function createPositionDetailsContent(position, options = {}) {
    const {
        includeActions = true,
        compareMode = false
    } = options;
    const totalScore = getTotalScore(position);
    const problemSolvingPercent = position.problemSolvingPercent ?? 0;
    const band = getBandForGrade(position.grade);
    const fragment = document.createDocumentFragment();
    const header = el("div", "details-header");
    const titleWrap = el("div", "details-title-wrap");
    const title = el("h2", "details-title", position.title);
    const meta = el("div", "position-meta");
    meta.textContent = `Job ID: ${position.job_id} | Компания: ${position.companyName} | Функция: ${position.familyName} | Грейд: ${position.grade}${band ? ` | Бэнд: ${band.name}` : ""} | Количество должностей: ${position.employeesCount || 0}`;
    titleWrap.append(title, meta);

    const gradeWrap = el("div", "details-grade-wrap");
    gradeWrap.append(
        el("div", "details-grade-label", "Итоговый грейд"),
        el("div", "details-grade-value", String(position.grade))
    );
    header.append(titleWrap, gradeWrap);

    const formGroup = el("div", "form-group");
    if (compareMode) {
        const descriptionBox = el("div", "position-description-box", position.description || "Описание не заполнено");
        formGroup.append(el("label", "", "Краткое описание:"), descriptionBox);
    } else {
        const textarea = document.createElement("textarea");
        textarea.id = "descInput";
        textarea.rows = 3;
        textarea.value = position.description || "";
        formGroup.append(el("label", "", "Краткое описание:"), textarea);
    }

    const chart = el("div", "chart-container");
    chart.append(
        el("h3", "", "Профиль оценки"),
        createScoreRow("Знания (Know-How)", position.scores.knowHow, SCORE_RANGES.knowHow, "#3498db"),
        createScoreRow(
            "Решение проблем",
            position.scores.problemSolving,
            SCORE_RANGES.problemSolving,
            "#2ecc71",
            `${position.scores.problemSolving} (${problemSolvingPercent}%)`
        ),
        createScoreRow(
            "Ответственность",
            position.scores.accountability,
            SCORE_RANGES.accountability,
            "#e74c3c",
            `${position.scores.accountability} (${position.accountabilityPercent}%, ${position.shortProfile})`
        )
    );

    const total = el("div", "total-score", `Итого баллов: ${totalScore}`);
    total.appendChild(el("div", "score-breakdown", `Соответствует грейду ${position.grade}${band ? ` и бэнду ${band.name}` : ""}`));
    chart.appendChild(total);

    fragment.append(header, formGroup);

    if (includeActions) {
        const actions = el("div", "details-actions");
        const saveButton = el("button", "", "Сохранить описание");
        saveButton.type = "button";
        saveButton.id = "descSaveBtn";
        actions.appendChild(saveButton);

        const editorModeButton = el("button", `btn-editor-inline${state.isEditorMode ? " active" : ""}`, state.isEditorMode ? "Выйти из редактора" : "Режим редактора");
        editorModeButton.type = "button";
        editorModeButton.id = "toggleEditorModeBtn";
        actions.appendChild(editorModeButton);

        if (state.isEditorMode) {
            const editButton = el("button", "btn-edit-position", "Изменить параметры");
            editButton.type = "button";
            editButton.id = "editPositionBtn";
            actions.appendChild(editButton);

            const deleteButton = el("button", "btn-delete-position", "Удалить должность");
            deleteButton.type = "button";
            deleteButton.id = "deletePositionBtn";
            actions.appendChild(deleteButton);
        }

        fragment.appendChild(actions);
    }

    fragment.appendChild(chart);
    return fragment;
}

function renderPositionDetails(position) {
    dom.detailsPanel.replaceChildren(createPositionDetailsContent(position));
}

function renderPositionComparisonView() {
    const container = el("div", "position-comparison-container");
    const companies = getComparisonCompanies();

    state.comparisonPositionSlots.forEach((slot, index) => {
        const column = el("div", "position-compare-column");
        const header = el("div", "position-compare-header");
        header.appendChild(el("div", "position-compare-title", `Должность ${index + 1}`));

        const selectorWrap = el("div", "position-compare-selector");
        const companySelect = document.createElement("select");
        companySelect.className = "position-compare-select";
        companySelect.dataset.compareSlot = String(index);
        companySelect.dataset.compareField = "companyId";
        const companyPlaceholder = el("option", "", "Выберите компанию");
        companyPlaceholder.value = "";
        companySelect.appendChild(companyPlaceholder);
        companies.forEach((company) => {
            const option = el("option", "", company.name);
            option.value = company.id;
            companySelect.appendChild(option);
        });
        companySelect.value = slot.companyId || "";

        const families = getComparisonFamiliesByCompany(slot.companyId);
        const familySelect = document.createElement("select");
        familySelect.className = "position-compare-select";
        familySelect.dataset.compareSlot = String(index);
        familySelect.dataset.compareField = "familyId";
        familySelect.disabled = !slot.companyId;
        const familyPlaceholder = el("option", "", "Выберите функцию");
        familyPlaceholder.value = "";
        familySelect.appendChild(familyPlaceholder);
        families.forEach((family) => {
            const option = el("option", "", family.name);
            option.value = family.id;
            familySelect.appendChild(option);
        });
        familySelect.value = slot.familyId || "";

        const positions = getComparisonPositions(slot.companyId, slot.familyId);
        const positionSelect = document.createElement("select");
        positionSelect.className = "position-compare-select";
        positionSelect.dataset.compareSlot = String(index);
        positionSelect.dataset.compareField = "positionId";
        positionSelect.disabled = !slot.familyId;
        const positionPlaceholder = el("option", "", "Выберите должность");
        positionPlaceholder.value = "";
        positionSelect.appendChild(positionPlaceholder);
        positions.forEach((position) => {
            const option = el("option", "", position.title);
            option.value = position.id;
            positionSelect.appendChild(option);
        });
        positionSelect.value = slot.positionId || "";

        selectorWrap.append(companySelect, familySelect, positionSelect);
        header.appendChild(selectorWrap);

        const body = el("div", "position-compare-body");
        const position = slot.positionId ? getPositionById(slot.positionId) : null;
        if (position) {
            body.appendChild(createPositionDetailsContent(position, {
                includeActions: false,
                compareMode: true
            }));
        } else {
            body.appendChild(el("div", "compare-position-placeholder", "Выберите должность для сравнения"));
        }

        column.append(header, body);
        container.appendChild(column);
    });

    dom.detailsPanel.replaceChildren(container);
}

function renderDetails() {
    if (state.isComparingPositions) {
        renderPositionComparisonView();
        return;
    }

    if (state.isComparing) {
        renderComparisonView();
        return;
    }

    const position = getCurrentPosition();
    if (!position) {
        replaceWithPlaceholder(dom.detailsPanel, "Выберите должность слева");
        return;
    }

    renderPositionDetails(position);
}

function renderApp(options = {}) {
    const {
        preserveStructureScroll = false,
        structureScrollTop = 0
    } = options;

    renderCompanyFilters();
    dom.compareBtn.classList.toggle("active", state.isComparing);
    dom.comparePositionsBtn.classList.toggle("active", state.isComparingPositions);
    dom.exportExcelBtn.textContent = state.isComparingPositions ? "Выгрузить в PDF" : "Выгрузить в Excel";

    if (state.isComparingPositions) {
        dom.companyFilters.style.display = "none";
        dom.structurePanel.style.display = "none";
        dom.detailsPanel.style.width = "100%";
        dom.btnAdd.classList.add("hidden");
        dom.functionSelect.disabled = true;
        renderPositionComparisonView();
        return;
    }

    dom.companyFilters.style.display = "flex";
    dom.structurePanel.style.display = "flex";
    dom.detailsPanel.style.width = "";

    if (state.isComparing) {
        dom.structurePanel.style.width = "320px";
        dom.btnAdd.classList.add("hidden");
        dom.panelTitle.textContent = "Фильтр семей";
        dom.checkboxWrapper.style.display = "none";
        dom.functionSelect.disabled = true;
        renderFilterList();
        renderComparisonView();
        return;
    }

    dom.structurePanel.style.width = state.customBands.length > 0 && state.showBandsInScale ? "600px" : "470px";
    dom.btnAdd.classList.remove("hidden");
    dom.panelTitle.textContent = "Шкала грейдов";
    dom.checkboxWrapper.style.display = "flex";
    dom.functionSelect.disabled = false;
    dom.functionSelect.value = state.currentFunction;
    renderStructure();
    if (preserveStructureScroll) {
        dom.structurePanel.scrollTop = structureScrollTop;
    }
    renderDetails();
}

function selectPosition(positionId) {
    const structureScrollTop = dom.structurePanel.scrollTop;
    state.currentPositionId = positionId;
    renderApp({
        preserveStructureScroll: true,
        structureScrollTop
    });
}

function saveDescription() {
    const position = getCurrentPosition();
    const textarea = document.getElementById("descInput");
    const button = document.getElementById("descSaveBtn");
    if (!position || !textarea || !button) return;

    position.description = textarea.value;
    persist();
    button.textContent = "Сохранено!";
    button.style.background = "#27ae60";
    setTimeout(() => {
        button.textContent = "Сохранить описание";
        button.style.background = "";
    }, 1500);
}

function setModalMode(mode, position = null) {
    state.modalMode = mode;
    state.editingPositionId = mode === "edit" && position ? position.id : null;
    dom.modalHeaderTitle.textContent = mode === "edit" ? "Редактирование должности" : "Добавление новой должности";
    dom.modalSaveBtn.textContent = mode === "edit" ? "Сохранить изменения" : "Сохранить";
}

function openCreateModal() {
    setModalMode("create");
    dom.modalOverlay.classList.add("active");
    dom.modalTitle.value = "";
    dom.modalDesc.value = "";
    dom.modalFunction.value = state.currentFunction !== "all" ? state.currentFunction : "";
    dom.modalCompany.value = state.selectedCompany !== "all" ? state.selectedCompany : "";
    dom.modalScoreKH.value = 200;
    dom.modalScorePS.value = 43;
    dom.modalShortProfile.value = "A2";
    updateCalculatedGrade();
}

function openEditModal() {
    const position = getCurrentPosition();
    if (!position) return;

    setModalMode("edit", position);
    dom.modalOverlay.classList.add("active");
    dom.modalTitle.value = position.title || "";
    dom.modalDesc.value = position.description || "";
    dom.modalFunction.value = position.familyId || "";
    dom.modalCompany.value = position.company || "";
    dom.modalScoreKH.value = String(position.scores?.knowHow ?? KNOW_HOW_VALUES[0]);
    dom.modalScorePS.value = String(position.problemSolvingPercent ?? PROBLEM_SOLVING_PERCENT_VALUES[0]);
    dom.modalShortProfile.value = position.shortProfile || SHORT_PROFILE_VALUES[0];
    updateCalculatedGrade();
}

function closeModal() {
    dom.modalOverlay.classList.remove("active");
    setModalMode("create");
}

function openBandsModal() {
    state.bandDrafts = state.customBands.map((band) => ({
        id: band.id,
        name: band.name,
        description: band.description || "",
        grades: [...band.grades]
    }));
    state.bandVisibilityDraft = state.showBandsInScale;
    dom.hideBandsInScaleCheckbox.checked = !state.bandVisibilityDraft;
    renderBandsEditor();
    dom.bandsModalOverlay.classList.add("active");
}

function closeBandsModal() {
    dom.bandsModalOverlay.classList.remove("active");
}

function addBandDraft() {
    state.bandDrafts.push(createEmptyBandDraft());
    state.bandDrafts[state.bandDrafts.length - 1].name = `Бэнд ${state.bandDrafts.length}`;
    renderBandsEditor();
}

function updateBandDraftField(bandId, field, value) {
    const band = state.bandDrafts.find((item) => item.id === bandId);
    if (!band) return;
    band[field] = value;
}

function updateBandDraftRange(bandId, field, value) {
    const band = state.bandDrafts.find((item) => item.id === bandId);
    if (!band) return;

    const availableGrades = getAvailableGradesForBand(bandId);
    if (!availableGrades.length) {
        band.grades = [];
        renderBandsEditor();
        return;
    }

    const currentRange = getBandDraftRange(band);
    let fromGrade = Number(currentRange.fromGrade || availableGrades[0]);
    let toGrade = Number(currentRange.toGrade || fromGrade);
    const nextValue = Number(value || fromGrade);

    if (field === "from-grade") fromGrade = nextValue;
    if (field === "to-grade") toGrade = nextValue;

    if (!availableGrades.includes(fromGrade)) {
        fromGrade = availableGrades[0];
    }

    if (!availableGrades.includes(toGrade)) {
        toGrade = availableGrades.includes(fromGrade) ? fromGrade : availableGrades[0];
    }

    band.grades = expandGradeRange(fromGrade, toGrade).filter((grade) => availableGrades.includes(grade));
    renderBandsEditor();
}

function removeBandDraft(bandId) {
    state.bandDrafts = state.bandDrafts.filter((band) => band.id !== bandId);
    renderBandsEditor();
}

function saveBands() {
    const normalizedBands = normalizeCustomBands(state.bandDrafts);
    const occupiedGrades = new Map();

    for (const band of state.bandDrafts) {
        if (!band.name.trim()) {
            alert("У каждого бэнда должно быть название.");
            return;
        }

        if (!band.grades.length) {
            alert("У каждого бэнда должен быть выбран диапазон грейдов.");
            return;
        }

        for (const grade of band.grades) {
            if (occupiedGrades.has(grade)) {
                alert(`Грейд ${grade} уже входит в бэнд "${occupiedGrades.get(grade)}". Один грейд нельзя назначить сразу в несколько бэндов.`);
                return;
            }
            occupiedGrades.set(grade, band.name.trim());
        }
    }

    state.customBands = normalizedBands;
    state.showBandsInScale = state.bandVisibilityDraft;
    persist();
    closeBandsModal();
    renderApp();
}

function readPositionFormData() {
    const title = dom.modalTitle.value.trim();
    const familyId = dom.modalFunction.value;
    const companyId = dom.modalCompany.value;

    if (!title) {
        alert("Введите название должности");
        return;
    }

    if (!familyId) {
        alert("Выберите семью должностей");
        return;
    }

    if (!companyId) {
        alert("Выберите компанию группы");
        return null;
    }

    const kh = snapToNearestAllowedValue(parseInt(dom.modalScoreKH.value, 10) || 0, KNOW_HOW_VALUES);
    const psPercent = snapToNearestAllowedValue(parseInt(dom.modalScorePS.value, 10) || 0, PROBLEM_SOLVING_PERCENT_VALUES);
    const ps = calculateProblemSolvingScore(kh, psPercent);
    const shortProfile = dom.modalShortProfile.value;
    const accountabilityPercent = getAccountabilityPercent(psPercent, shortProfile);

    if (accountabilityPercent === null) {
        alert("Для выбранного сочетания Problem Solving % и короткого профиля не найден процент ответственности.");
        return null;
    }

    const acc = calculateAccountabilityScore(kh, accountabilityPercent);
    const totalScore = kh + ps + acc;
    const calculatedGrade = calculateGrade(totalScore);

    if (calculatedGrade === null) {
        alert(`Сумма ${totalScore} не попадает в диапазон грейдов из таблицы Hay.`);
        return null;
    }

    return {
        title,
        familyId,
        companyId,
        description: dom.modalDesc.value.trim(),
        shortProfile,
        problemSolvingPercent: psPercent,
        accountabilityPercent,
        grade: calculatedGrade,
        totalScore,
        scores: {
            knowHow: kh,
            problemSolving: ps,
            accountability: acc
        }
    };
}

function saveNewPosition() {
    const formData = readPositionFormData();
    if (!formData) return;

    const newPosition = {
        id: `pos_${Date.now()}`,
        job_id: getNextJobId(),
        title: formData.title,
        familyId: formData.familyId,
        familyName: getFamilyName(formData.familyId),
        company: formData.companyId,
        companyName: getCompanyName(formData.companyId),
        grade: formData.grade,
        description: formData.description,
        employeesCount: 1,
        shortProfile: formData.shortProfile,
        problemSolvingPercent: formData.problemSolvingPercent,
        accountabilityPercent: formData.accountabilityPercent,
        scores: formData.scores
    };

    if (!state.positionsByFamily[formData.familyId]) {
        state.positionsByFamily[formData.familyId] = [];
    }

    state.positionsByFamily[formData.familyId].push(newPosition);
    state.currentFunction = formData.familyId;
    state.currentPositionId = newPosition.id;
    if (state.selectedCompany === "all") {
        state.selectedCompany = formData.companyId;
    }
    persist();
    closeModal();
    renderApp();
}

function saveExistingPosition() {
    const position = getCurrentPosition();
    if (!position) return;

    const formData = readPositionFormData();
    if (!formData) return;

    const oldFamilyId = position.familyId;
    position.title = formData.title;
    position.familyId = formData.familyId;
    position.familyName = getFamilyName(formData.familyId);
    position.company = formData.companyId;
    position.companyName = getCompanyName(formData.companyId);
    position.grade = formData.grade;
    position.description = formData.description;
    position.shortProfile = formData.shortProfile;
    position.problemSolvingPercent = formData.problemSolvingPercent;
    position.accountabilityPercent = formData.accountabilityPercent;
    position.scores = formData.scores;

    if (oldFamilyId !== formData.familyId) {
        state.positionsByFamily[oldFamilyId] = (state.positionsByFamily[oldFamilyId] || []).filter((item) => item.id !== position.id);
        if (!state.positionsByFamily[formData.familyId]) {
            state.positionsByFamily[formData.familyId] = [];
        }
        state.positionsByFamily[formData.familyId].push(position);
    }

    state.currentFunction = formData.familyId;
    state.currentPositionId = position.id;
    if (state.selectedCompany !== "all") {
        state.selectedCompany = formData.companyId;
    }

    persist();
    closeModal();
    renderApp();
}

function savePositionFromModal() {
    if (state.modalMode === "edit") {
        saveExistingPosition();
        return;
    }
    saveNewPosition();
}

function toggleEditorMode() {
    state.isEditorMode = !state.isEditorMode;
    renderApp();
}

function openDeleteConfirmModal() {
    const position = getCurrentPosition();
    if (!position) return;

    state.pendingDeletePositionId = position.id;
    dom.deleteConfirmText.textContent = `Удалить должность "${position.title}"? Это действие нельзя отменить.`;
    dom.deleteConfirmOverlay.classList.add("active");
}

function closeDeleteConfirmModal() {
    dom.deleteConfirmOverlay.classList.remove("active");
    state.pendingDeletePositionId = null;
}

function deleteCurrentPosition() {
    const position = state.pendingDeletePositionId
        ? getPositionById(state.pendingDeletePositionId)
        : getCurrentPosition();
    if (!position) {
        closeDeleteConfirmModal();
        return;
    }

    const familyId = position.familyId;
    state.positionsByFamily[familyId] = (state.positionsByFamily[familyId] || []).filter((item) => item.id !== position.id);
    state.currentPositionId = null;

    const remainingPositions = getCurrentPositions();
    if (remainingPositions.length) {
        state.currentPositionId = remainingPositions[0].id;
    }

    persist();
    closeDeleteConfirmModal();
    renderApp();
}

function toggleComparison() {
    state.isComparing = !state.isComparing;
    if (state.isComparing) {
        state.isComparingPositions = false;
    }
    renderApp();
}

function togglePositionComparison() {
    state.isComparingPositions = !state.isComparingPositions;
    if (state.isComparingPositions) {
        state.isComparing = false;
        state.currentPositionId = null;
    }
    renderApp();
}

function updateComparisonPositionSlot(slotIndex, field, value) {
    const slot = state.comparisonPositionSlots[slotIndex];
    if (!slot) return;

    slot[field] = value;

    if (field === "companyId") {
        slot.familyId = "";
        slot.positionId = "";
    }

    if (field === "familyId") {
        slot.positionId = "";
    }
}

function bindEvents() {
    dom.functionSelect.addEventListener("change", (event) => {
        if (state.isComparing || state.isComparingPositions) return;
        state.currentFunction = event.target.value;
        state.currentPositionId = null;
        renderApp();
    });

    dom.hideEmptyCheckbox.addEventListener("change", renderStructure);
    dom.btnAdd.addEventListener("click", openCreateModal);
    dom.compareBtn.addEventListener("click", toggleComparison);
    dom.comparePositionsBtn.addEventListener("click", togglePositionComparison);
    dom.exportExcelBtn.addEventListener("click", handleExportAction);
    dom.manageBandsBtn.addEventListener("click", openBandsModal);
    dom.modalCancelBtn.addEventListener("click", closeModal);
    dom.modalSaveBtn.addEventListener("click", savePositionFromModal);
    dom.bandsModalCancelBtn.addEventListener("click", closeBandsModal);
    dom.bandsModalSaveBtn.addEventListener("click", saveBands);
    dom.addBandRowBtn.addEventListener("click", addBandDraft);
    dom.hideBandsInScaleCheckbox.addEventListener("change", (event) => {
        state.bandVisibilityDraft = !event.target.checked;
    });
    dom.deleteConfirmCancelBtn.addEventListener("click", closeDeleteConfirmModal);
    dom.deleteConfirmSubmitBtn.addEventListener("click", deleteCurrentPosition);
    dom.modalOverlay.addEventListener("click", (event) => {
        if (event.target === dom.modalOverlay) closeModal();
    });
    dom.bandsModalOverlay.addEventListener("click", (event) => {
        if (event.target === dom.bandsModalOverlay) closeBandsModal();
    });
    dom.deleteConfirmOverlay.addEventListener("click", (event) => {
        if (event.target === dom.deleteConfirmOverlay) closeDeleteConfirmModal();
    });

    [dom.modalScoreKH, dom.modalScorePS, dom.modalShortProfile].forEach((input) => {
        input.addEventListener("input", updateCalculatedGrade);
        input.addEventListener("change", updateCalculatedGrade);
    });

    dom.companyFilters.addEventListener("click", (event) => {
        if (state.isComparingPositions) return;
        const button = event.target.closest(".company-filter-btn");
        if (!button) return;
        state.selectedCompany = button.dataset.companyId;
        state.currentPositionId = null;
        renderApp();
    });

    dom.gradesList.addEventListener("click", (event) => {
        const card = event.target.closest(".position-card");
        if (!card || state.isComparing || state.isComparingPositions) return;
        selectPosition(card.dataset.positionId);
    });

    dom.gradesList.addEventListener("change", (event) => {
        const filter = event.target.closest(".family-filter");
        if (!filter) return;
        state.comparisonFilters[filter.dataset.familyId] = filter.checked;
        renderComparisonView();
    });

    dom.bandsEditorList.addEventListener("input", (event) => {
        const input = event.target.closest("[data-field='name'], [data-field='description']");
        if (!input) return;
        updateBandDraftField(input.dataset.bandId, input.dataset.field, input.value);
    });

    dom.bandsEditorList.addEventListener("change", (event) => {
        const rangeInput = event.target.closest("[data-field='from-grade'], [data-field='to-grade']");
        if (!rangeInput) return;
        updateBandDraftRange(rangeInput.dataset.bandId, rangeInput.dataset.field, rangeInput.value);
    });

    dom.bandsEditorList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action='remove-band']");
        if (!button) return;
        removeBandDraft(button.dataset.bandId);
    });

    dom.detailsPanel.addEventListener("click", (event) => {
        if (event.target.id === "descSaveBtn") saveDescription();
        if (event.target.id === "toggleEditorModeBtn") toggleEditorMode();
        if (event.target.id === "editPositionBtn") openEditModal();
        if (event.target.id === "deletePositionBtn") openDeleteConfirmModal();
    });

    dom.detailsPanel.addEventListener("change", (event) => {
        const select = event.target.closest(".position-compare-select");
        if (!select) return;
        const slotIndex = Number(select.dataset.compareSlot);
        updateComparisonPositionSlot(slotIndex, select.dataset.compareField, select.value || "");
        renderPositionComparisonView();
    });
}

async function init() {
    try {
        const catalog = await loadCatalog();
        const savedState = parseSavedState(storage.loadSaved());

        state.companies = catalog.companies || [];
        state.companyMap = Object.fromEntries(state.companies.map((company) => [company.id, company]));
        state.families = catalog.families || [];
        state.familyMap = Object.fromEntries(state.families.map((family) => [family.id, family]));
        state.positionsByFamily = enrichPositions(normalizePositions(savedState.positionsByFamily || catalog.positionsByFamily || {}));
        state.customBands = normalizeCustomBands(savedState.customBands);
        state.showBandsInScale = savedState.showBandsInScale !== false;
        state.bandVisibilityDraft = state.showBandsInScale;
        state.currentFunction = "all";

        populateSelectors();
        persist();
        bindEvents();
        renderApp();
    } catch (error) {
        console.error(error);
        replaceWithPlaceholder(dom.detailsPanel, "Не удалось загрузить данные.");
        replaceWithPlaceholder(dom.gradesList, "Не удалось загрузить данные", { padding: "20px" });
    }
}

init();
