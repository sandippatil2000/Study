import type { ISupplierRequest } from '../models/SupplierRequest';

let mockSupplierRequests: ISupplierRequest[] = [
    {
        RequestId: 1, UserId: 101, FirstName: 'Alice', LastName: 'Johnson',
        Email: 'alice@example.com', Supplier: 'Tech Corp',
        Description: 'Request for networking hardware components and accessories.',
        Date: new Date('2026-03-25'), Status: 'Completed',
        SupplierFile: 'supplier_tech_corp.pdf',
        ProductFiles: ['product_list_q1.xlsx', 'specs_networking.pdf'],
    },
    {
        RequestId: 2, UserId: 102, FirstName: 'Bob', LastName: 'Smith',
        Email: 'bob@example.com', Supplier: 'Global Supply',
        Description: 'Bulk order request for office stationery and consumables.',
        Date: new Date('2026-03-26'), Status: 'Pending',
        SupplierFile: 'supplier_global_supply.pdf',
        ProductFiles: ['office_products.xlsx'],
    },
    {
        RequestId: 3, UserId: 103, FirstName: 'Carol', LastName: 'White',
        Email: 'carol@example.com', Supplier: 'Prime Electronics',
        Description: 'Request for electronic components for the manufacturing line.',
        Date: new Date('2026-03-27'), Status: 'Processing',
        SupplierFile: null,
        ProductFiles: ['electronics_bom.xlsx', 'component_specs.pdf', 'pricing_sheet.pdf'],
    },
    {
        RequestId: 4, UserId: 104, FirstName: 'David', LastName: 'Lee',
        Email: 'david@example.com', Supplier: 'Tech Corp',
        Description: 'Follow-up request for server rack units and cabling.',
        Date: new Date('2026-03-28'), Status: 'Completed',
        SupplierFile: 'supplier_tech_corp_v2.pdf',
        ProductFiles: [],
    },
    {
        RequestId: 5, UserId: 105, FirstName: 'Eva', LastName: 'Brown',
        Email: 'eva@example.com', Supplier: 'Global Supply',
        Description: 'Cancelled due to budget freeze for this quarter.',
        Date: new Date('2026-03-29'), Status: 'Cancelled',
        SupplierFile: null,
        ProductFiles: [],
    },
];

export const supplierApi = {
    // Get all supplier requests
    GetSupplierRequests: async (): Promise<ISupplierRequest[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...mockSupplierRequests]), 500));
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
