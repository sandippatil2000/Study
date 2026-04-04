import { RequestStatus } from '../models/RequestStatus';
import type { ISupplierRequest } from '../models/SupplierRequest';

let mockSupplierRequests: ISupplierRequest[] = [
    {
        RequestId: 1, UserId: 101, FirstName: 'Alice', LastName: 'Johnson',
        Email: 'alice@example.com', Supplier: 'Tech Corp',
        Description: 'Request for networking hardware components and accessories.',
        Date: new Date('2026-03-01'), Status: RequestStatus.Saved,
        SupplierFile: 'supplier_tech_corp.pdf',
        ProductFiles: ['product_list_q1.xlsx', 'specs_networking.pdf'],
        FileType: 'pdf', AssignedTo: 'css@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 2, UserId: 102, FirstName: 'Bob', LastName: 'Smith',
        Email: 'bob@example.com', Supplier: 'Global Supply',
        Description: 'Bulk order request for office stationery and consumables.',
        Date: new Date('2026-03-03'), Status: RequestStatus.Submitted,
        SupplierFile: 'supplier_global_supply.pdf',
        ProductFiles: ['office_products.xlsx'],
        FileType: 'xlsx', AssignedTo: 'css2@example.com',
        CSSEmail: 'css2@example.com', MDEmail: 'md2@example.com',
    },
    {
        RequestId: 3, UserId: 103, FirstName: 'Carol', LastName: 'White',
        Email: 'carol@example.com', Supplier: 'Prime Electronics',
        Description: 'Request for electronic components for the manufacturing line.',
        Date: new Date('2026-03-05'), Status: RequestStatus.CSSToValidate,
        SupplierFile: 'prime_electronics_supplier.pdf',
        ProductFiles: ['electronics_bom.xlsx', 'component_specs.pdf'],
        FileType: 'pdf', AssignedTo: 'css3@example.com',
        CSSEmail: 'css3@example.com', MDEmail: 'md3@example.com',
    },
    {
        RequestId: 4, UserId: 104, FirstName: 'David', LastName: 'Lee',
        Email: 'david@example.com', Supplier: 'Tech Corp',
        Description: 'Follow-up request for server rack units and cabling.',
        Date: new Date('2026-03-07'), Status: RequestStatus.MDToValidate,
        SupplierFile: 'supplier_tech_corp_v2.pdf',
        ProductFiles: ['rack_specs.pdf'],
        FileType: 'pdf', AssignedTo: 'md1@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 5, UserId: 105, FirstName: 'Eva', LastName: 'Brown',
        Email: 'eva@example.com', Supplier: 'Global Supply',
        Description: 'Bulk stationery order split across multiple departments.',
        Date: new Date('2026-03-09'), Status: RequestStatus.Splited,
        SupplierFile: 'supplier_global_v2.pdf',
        ProductFiles: ['dept_a_products.xlsx', 'dept_b_products.xlsx'],
        FileType: 'xlsx', AssignedTo: 'md2@example.com',
        CSSEmail: 'css2@example.com', MDEmail: 'md2@example.com',
    },
    {
        RequestId: 6, UserId: 106, FirstName: 'Frank', LastName: 'Davis',
        Email: 'frank@example.com', Supplier: 'Prime Electronics',
        Description: 'Validated supplier file uploaded after MD approval.',
        Date: new Date('2026-03-11'), Status: RequestStatus.Uploaded,
        SupplierFile: 'validated_prime_electronics.pdf',
        ProductFiles: ['validated_bom.xlsx'],
        FileType: 'pdf', AssignedTo: 'md3@example.com',
        CSSEmail: 'css3@example.com', MDEmail: 'md3@example.com',
    },
    {
        RequestId: 7, UserId: 107, FirstName: 'Grace', LastName: 'Martinez',
        Email: 'grace@example.com', Supplier: 'FastParts Ltd',
        Description: 'Completed request for mechanical parts for Q1 production.',
        Date: new Date('2026-03-13'), Status: RequestStatus.Completed,
        SupplierFile: 'fastparts_supplier.pdf',
        ProductFiles: ['parts_list_q1.xlsx'],
        FileType: 'pdf', AssignedTo: 'md1@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 8, UserId: 108, FirstName: 'Henry', LastName: 'Wilson',
        Email: 'henry@example.com', Supplier: 'MegaStore',
        Description: 'Cancelled order — vendor did not meet compliance requirements.',
        Date: new Date('2026-03-15'), Status: RequestStatus.Cancelled,
        SupplierFile: null,
        ProductFiles: [],
        FileType: undefined, AssignedTo: undefined,
        CSSEmail: 'css2@example.com', MDEmail: undefined,
    },
    {
        RequestId: 9, UserId: 109, FirstName: 'Irene', LastName: 'Taylor',
        Email: 'irene@example.com', Supplier: 'Tech Corp',
        Description: 'New request for SSD drives and RAM for server upgrade.',
        Date: new Date('2026-03-17'), Status: RequestStatus.Saved,
        SupplierFile: 'tech_corp_ssd.pdf',
        ProductFiles: ['ssd_specs.pdf', 'ram_specs.pdf'],
        FileType: 'pdf', AssignedTo: 'css1@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md2@example.com',
    },
    {
        RequestId: 10, UserId: 110, FirstName: 'Jack', LastName: 'Anderson',
        Email: 'jack@example.com', Supplier: 'Global Supply',
        Description: 'Submitted request for cleaning supplies across all branches.',
        Date: new Date('2026-03-19'), Status: RequestStatus.Submitted,
        SupplierFile: 'global_supply_cleaning.pdf',
        ProductFiles: ['cleaning_products.xlsx'],
        FileType: 'xlsx', AssignedTo: 'css3@example.com',
        CSSEmail: 'css3@example.com', MDEmail: 'md3@example.com',
    },
    {
        RequestId: 11, UserId: 111, FirstName: 'Karen', LastName: 'Thomas',
        Email: 'karen@example.com', Supplier: 'FastParts Ltd',
        Description: 'CSS team validating supplier credentials and product list.',
        Date: new Date('2026-03-20'), Status: RequestStatus.CSSToValidate,
        SupplierFile: 'fastparts_supplier_v2.pdf',
        ProductFiles: ['parts_catalogue.xlsx'],
        FileType: 'pdf', AssignedTo: 'css2@example.com',
        CSSEmail: 'css2@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 12, UserId: 112, FirstName: 'Leo', LastName: 'Jackson',
        Email: 'leo@example.com', Supplier: 'MegaStore',
        Description: 'MD reviewing supplier file for office furniture procurement.',
        Date: new Date('2026-03-21'), Status: RequestStatus.MDToValidate,
        SupplierFile: 'megastore_furniture.pdf',
        ProductFiles: ['furniture_list.xlsx', 'floor_plan.pdf'],
        FileType: 'pdf', AssignedTo: 'md2@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md2@example.com',
    },
    {
        RequestId: 13, UserId: 113, FirstName: 'Mia', LastName: 'Harris',
        Email: 'mia@example.com', Supplier: 'Prime Electronics',
        Description: 'Split request — divided per product category after MD approval.',
        Date: new Date('2026-03-22'), Status: RequestStatus.Splited,
        SupplierFile: 'prime_split_supplier.pdf',
        ProductFiles: ['category_a.xlsx', 'category_b.xlsx', 'category_c.xlsx'],
        FileType: 'xlsx', AssignedTo: 'md3@example.com',
        CSSEmail: 'css3@example.com', MDEmail: 'md3@example.com',
    },
    {
        RequestId: 14, UserId: 114, FirstName: 'Noah', LastName: 'Clark',
        Email: 'noah@example.com', Supplier: 'Tech Corp',
        Description: 'Validated file uploaded to ERP for final processing.',
        Date: new Date('2026-03-23'), Status: RequestStatus.Uploaded,
        SupplierFile: 'tech_corp_erp_upload.pdf',
        ProductFiles: ['erp_product_data.xlsx'],
        FileType: 'pdf', AssignedTo: 'md1@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 15, UserId: 115, FirstName: 'Olivia', LastName: 'Lewis',
        Email: 'olivia@example.com', Supplier: 'Global Supply',
        Description: 'Completed procurement for IT accessories Q1.',
        Date: new Date('2026-03-24'), Status: RequestStatus.Completed,
        SupplierFile: 'global_supply_it.pdf',
        ProductFiles: ['it_accessories.xlsx'],
        FileType: 'pdf', AssignedTo: 'md2@example.com',
        CSSEmail: 'css2@example.com', MDEmail: 'md2@example.com',
    },
    {
        RequestId: 16, UserId: 116, FirstName: 'Peter', LastName: 'Robinson',
        Email: 'peter@example.com', Supplier: 'FastParts Ltd',
        Description: 'Cancelled — parts no longer required after project scope change.',
        Date: new Date('2026-03-25'), Status: RequestStatus.Cancelled,
        SupplierFile: null,
        ProductFiles: [],
        FileType: undefined, AssignedTo: undefined,
        CSSEmail: 'css3@example.com', MDEmail: undefined,
    },
    {
        RequestId: 17, UserId: 117, FirstName: 'Quinn', LastName: 'Walker',
        Email: 'quinn@example.com', Supplier: 'MegaStore',
        Description: 'New saved request for janitorial equipment across warehouses.',
        Date: new Date('2026-03-26'), Status: RequestStatus.Saved,
        SupplierFile: 'megastore_janitorial.pdf',
        ProductFiles: ['janitorial_list.xlsx'],
        FileType: 'pdf', AssignedTo: undefined,
        CSSEmail: undefined, MDEmail: undefined,
    },
    {
        RequestId: 18, UserId: 118, FirstName: 'Rachel', LastName: 'Hall',
        Email: 'rachel@example.com', Supplier: 'Tech Corp',
        Description: 'Submitted request for annual software license renewals.',
        Date: new Date('2026-03-27'), Status: RequestStatus.Submitted,
        SupplierFile: 'tech_corp_licenses.pdf',
        ProductFiles: ['license_list.xlsx'],
        FileType: 'pdf', AssignedTo: 'css1@example.com',
        CSSEmail: 'css1@example.com', MDEmail: 'md1@example.com',
    },
    {
        RequestId: 19, UserId: 119, FirstName: 'Sam', LastName: 'Young',
        Email: 'sam@example.com', Supplier: 'Prime Electronics',
        Description: 'CSS team validating UPS units and power backup equipment.',
        Date: new Date('2026-03-28'), Status: RequestStatus.CSSToValidate,
        SupplierFile: 'prime_ups_supplier.pdf',
        ProductFiles: ['ups_specs.pdf'],
        FileType: 'pdf', AssignedTo: 'css2@example.com',
        CSSEmail: 'css2@example.com', MDEmail: 'md3@example.com',
    },
    {
        RequestId: 20, UserId: 120, FirstName: 'Tara', LastName: 'King',
        Email: 'tara@example.com', Supplier: 'Global Supply',
        Description: 'MD reviewing supplier documentation for lab consumables.',
        Date: new Date('2026-03-29'), Status: RequestStatus.MDToValidate,
        SupplierFile: 'global_supply_lab.pdf',
        ProductFiles: ['lab_consumables.xlsx', 'safety_sheets.pdf'],
        FileType: 'xlsx', AssignedTo: 'md2@example.com',
        CSSEmail: 'css3@example.com', MDEmail: 'md2@example.com',
    },
];

export const supplierApi = {
    // Get all supplier requests
    GetSupplierRequests: async (): Promise<ISupplierRequest[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...mockSupplierRequests]), 500));
    },

    GetSupplierRequestsByStatus: async (status: string[]): Promise<ISupplierRequest[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...mockSupplierRequests].filter(r => status.includes(r.Status))), 500));
    },
    // Get request by ID
    GetSupplierRequestById: async (id: number): Promise<ISupplierRequest | undefined> => {
        return new Promise((resolve) => setTimeout(() => resolve(mockSupplierRequests.find(r => r.RequestId === id)), 500));
    },

    // Create new request
    CreateSupplierRequest: async (request: Omit<ISupplierRequest, 'RequestId'>): Promise<ISupplierRequest> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRequest: ISupplierRequest = {
                    ...request,
                    RequestId: mockSupplierRequests.length > 0 ? Math.max(...mockSupplierRequests.map(r => r.RequestId)) + 1 : 1
                };
                mockSupplierRequests.push(newRequest);
                resolve(newRequest);
            }, 500);
        });
    },

    // Update existing request
    UpdateSupplierRequest: async (id: number, updatedData: Partial<ISupplierRequest>): Promise<ISupplierRequest> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockSupplierRequests.findIndex(r => r.RequestId === id);
                if (index === -1) {
                    reject(new Error('Supplier request not found'));
                    return;
                }
                mockSupplierRequests[index] = { ...mockSupplierRequests[index], ...updatedData };
                resolve(mockSupplierRequests[index]);
            }, 500);
        });
    },

    // Delete request
    DeleteSupplierRequest: async (id: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockSupplierRequests.findIndex(r => r.RequestId === id);
                if (index === -1) {
                    reject(new Error('Supplier request not found'));
                    return;
                }
                mockSupplierRequests = mockSupplierRequests.filter(r => r.RequestId !== id);
                resolve();
            }, 500);
        });
    }
};
