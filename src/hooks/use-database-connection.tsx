
import { useState, useEffect } from 'react';
import { fetchData, fetchFromView, insertData, updateData, deleteData } from '@/utils/database';
import { toast } from '@/hooks/use-toast';

// Import the database operation hooks
import { useDatabaseTable } from './database/use-database-table';
import { useDatabaseView } from './database/use-database-view';

// Re-export for backward compatibility
export { useDatabaseTable, useDatabaseView };
