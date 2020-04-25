import { gql } from '@apollo/client';

export const Query = {
	searchContentQuery: gql`
		query($mode: String!) {
			searchContent(mode: $mode) {
				resources {
					secure_url
					resource_type
				}
			}
		}
	`,
};
